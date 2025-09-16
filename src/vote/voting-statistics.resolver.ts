import { Args, Int, Parent, Query, ResolveField, Resolver, } from '@nestjs/graphql';
import { VotingStatisticsDto } from './dto/voting-statistics.dto';
import { VoteService } from './vote.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { VoteDto } from './dto/vote.dto';

@Resolver(() => VotingStatisticsDto)
export class VotingStatisticsResolver {
  constructor(private voteService: VoteService) {}

  @Query(() => VotingStatisticsDto)
  async votingStatistics(
    @Args('voteId', { type: () => Int }, ParseBigIntPipe) voteId: bigint,
    @Args('starId', { type: () => Int }, ParseBigIntPipe) starId: bigint,
  ): Promise<VotingStatisticsDto> {
    return <VotingStatisticsDto>{
      starId: starId,
      voteId: voteId,
      count: await this.voteService.getVoteCount(voteId, starId),
    };
  }

  @ResolveField('vote', () => VoteDto)
  async vote(
    @Parent() votingStatistics: VotingStatisticsDto,
  ): Promise<VoteDto> {
    return <VoteDto>await this.voteService.getVoteById(votingStatistics.voteId);
  }
}
