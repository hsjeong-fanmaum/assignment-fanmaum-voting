import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';
import { VoteResolver } from './vote.resolver';
import { VotingStatisticsResolver } from './voting-statistics.resolver';

@Module({
  imports: [PrismaModule],
  providers: [VoteService, VoteResolver, VotingStatisticsResolver],
  controllers: [VoteController],
})
export class VoteModule {}
