import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AddVotingLogResultDto,
  LeaderboardResultDto,
  VoteResultDto,
} from './dto/vote.response.dto';
import { VoteStatus } from './vote.enum';
import { AddVoteRequestDto } from './dto/vote.request.dto';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  /**
   * 투표 검색(투표 목록 조회) 진행
   * 각 투표의 1, 2위 검색은 다른 검색 로직 통해서 진행
   */
  async searchVote(
    page?: number,
    size?: number,
    status?: VoteStatus,
    search?: string,
  ): Promise<VoteResultDto[]> {
    const pageSize = size ?? 10;
    const pageNumber = (page ?? 1) - 1;
    //await은 경고가 발생하기도 하고 이미 이 자체로 promise를 반환하고 있기 때문에 제외
    return this.prisma.vote.findMany({
      select: {
        id: true,
        name: true,
        startedAt: true,
        endedAt: true,
      },
      where: {
        name: { contains: search },
        ...this.dateSearchOptions(status),
      },
      skip: pageNumber * pageSize,
      take: pageSize,
    });
  }

  /**
   * 날짜 검색 옵션 설정
   * @param status 검색 옵션(문자열)
   * @returns 검색 옵션(prisma의 where절에 넣을 수 있는 옵션)
   * @private
   */
  private dateSearchOptions(status?: VoteStatus): Prisma.VoteWhereInput {
    switch (status) {
      case VoteStatus.NOT_STARTED:
        return {
          startedAt: { gt: new Date() },
        };
      case VoteStatus.RUNNING:
        return {
          startedAt: { lte: new Date() },
          endedAt: { gt: new Date() },
        };
      case VoteStatus.ENDED:
        return {
          endedAt: { lte: new Date() },
        };
      default:
        return {}; //undefined 또는 예상하지 못한 type일 때 검색조건 없음
    }
  }

  async getVoteById(id: bigint): Promise<VoteResultDto> {
    const findResult: VoteResultDto | null = await this.prisma.vote.findUnique({
      select: {
        id: true,
        name: true,
        startedAt: true,
        endedAt: true,
      },
      where: {
        id: id,
      },
    });

    if (!findResult) {
      throw new NotFoundException(`id: ${id} not found`);
    }
    return findResult;
  }

  async getLeaderboardOfVote(voteId: bigint): Promise<LeaderboardResultDto[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.prisma.votingLog.groupBy({
      by: ['starId'],
      _count: {
        starId: true,
      },
      where: {
        voteId: voteId,
        valid: true,
      },
      orderBy: {
        _count: {
          starId: 'desc',
        },
      },
    });
  }

  async getVoteCount(voteId: bigint, starId: bigint): Promise<number> {
    return this.prisma.votingLog.count({
      where: {
        voteId: voteId,
        starId: starId,
        valid: true,
      },
    });
  }

  //투표 실행(addVotingLog)
  async addVotingLog(
    voteId: bigint,
    starId: bigint,
    userId?: bigint,
  ): Promise<AddVotingLogResultDto> {
    return this.prisma.votingLog.create({
      data: {
        userId: userId,
        voteId: voteId,
        starId: starId,
      },
    });
    // return 값 없음
  }

  // 테스트 시 데이터 삽입을 위한 로직
  async addVote(addVoteDto: AddVoteRequestDto): Promise<VoteResultDto> {
    return this.prisma.vote.create({
      data: addVoteDto,
    });
  }
}
