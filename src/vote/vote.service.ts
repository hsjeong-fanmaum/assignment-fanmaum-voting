import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  /**
   * 투표 검색(투표 목록 조회) 진행
   * 각 투표의 1, 2위 검색은 다른 검색 로직 통해서 진행
   */
  async voteSearch(
    page?: number,
    size?: number,
    status?: string,
    search?: string,
  ) {
    const pageSize = size || 10;
    //await은 경고가 발생하기도 하고 이미 이 자체로 promise를 반환하고 있기 때문에 제외
    return this.prisma.vote.findMany({
      select: {
        id: true,
        name: true,
        startAt: true,
        endAt: true,
      },
      where: {
        name: { contains: search },
        ...this.dateSearchOptions(status),
      },
      skip: ((page || 1) - 1) * pageSize,
      take: pageSize,
    });
  }

  /**
   * 날짜 검색 옵션 설정
   * @param status 검색 옵션(문자열)
   * @returns 검색 옵션(prisma의 where절에 넣을 수 있는 옵션)
   * @private
   */
  private dateSearchOptions(status?: string): Prisma.VoteWhereInput {
    if (status === 'NOT_STARTED')
      return {
        startAt: { gt: new Date() },
      };
    else if (status === 'RUNNING')
      return {
        startAt: { lte: new Date() },
        endAt: { gt: new Date() },
      };
    else if (status === 'ENDED')
      return {
        endAt: { lte: new Date() },
      };
    else return {}; //undefined 또는 예상하지 못한 type일 때 검색조건 없음
  }
}
