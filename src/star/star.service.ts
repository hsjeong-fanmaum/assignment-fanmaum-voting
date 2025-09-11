import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetStarResultDto } from './star.response.dto';
import { AddStarRequestDto } from './star.request.dto';

@Injectable()
export class StarService {
  constructor(private prisma: PrismaService) {}

  async getStarById(id: bigint): Promise<GetStarResultDto> {
    const findResult = await this.prisma.star.findUnique({
      select: {
        id: true,
        name: true,
        profileImageUrl: true,
      },
      where: {
        id: id,
      },
    });
    if (findResult) {
      return findResult;
    } else {
      throw new NotFoundException(`id: ${id} not found`);
    }
  }

  async searchStar(keyword?: string): Promise<GetStarResultDto[]> {
    return this.prisma.star.findMany({
      select: {
        id: true,
        name: true,
        profileImageUrl: true,
      },
      where: {
        //파트장님 피드백 반영 버전
        ...(keyword && { name: { contains: keyword } }),
      },
    });
  }

  // 테스트 시 데이터 삽입을 위한 로직
  async addStar(addStarDto: AddStarRequestDto): Promise<void> {
    await this.prisma.star.create({
      data: addStarDto,
    });
  }
}
