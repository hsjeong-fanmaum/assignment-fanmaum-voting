import { Test, TestingModule } from '@nestjs/testing';
import { StarService } from './star.service';
import { StarResultDto } from './dto/star.response.dto';
import { PrismaModule } from '../prisma/prisma.module';

describe('StarService', () => {
  let service: StarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [StarService],
    }).compile();

    service = module.get<StarService>(StarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get star by id test', async () => {
    for (let i: number = 1; i <= 3; i++) {
      expect(await service.getStarById(BigInt(i))).toEqual({
        id: BigInt(i),
        name: 'star' + i,
        profileImageUrl: 'image' + i,
      });
    }
  });

  it('star search test', async () => {
    const allStarResult: StarResultDto[] = [
      {
        id: BigInt(1),
        name: 'star' + 1,
        profileImageUrl: 'image' + 1,
      },
      {
        id: BigInt(2),
        name: 'star' + 2,
        profileImageUrl: 'image' + 2,
      },
      {
        id: BigInt(3),
        name: 'star' + 3,
        profileImageUrl: 'image' + 3,
      },
    ];

    expect(await service.searchStar('star')).toEqual(allStarResult);
    expect(await service.searchStar()).toEqual(allStarResult);
    expect(await service.searchStar('1')).toEqual([allStarResult[0]]);
    expect(await service.searchStar('rhgiuesdhfiluekshr')).toEqual([]);
  });
});
