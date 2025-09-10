import { Test, TestingModule } from '@nestjs/testing';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('VoteService', () => {
  let service: VoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [VoteService],
    }).compile();

    service = module.get<VoteService>(VoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return result', async () => {
    const result = await service.getLeaderboardOfVote(BigInt(1));
    console.log(result);
    expect(result).toBeDefined();
  });
});
