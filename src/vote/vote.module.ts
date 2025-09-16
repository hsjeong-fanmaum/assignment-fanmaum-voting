import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteController } from './vote.controller';
import { VoteResolver } from './vote.resolver';
import { VotingStatisticsResolver } from './voting-statistics.resolver';
import { StarModule } from '../star/star.module';

@Module({
  imports: [PrismaModule, StarModule],
  providers: [VoteService, VoteResolver, VotingStatisticsResolver],
  controllers: [VoteController],
})
export class VoteModule {}
