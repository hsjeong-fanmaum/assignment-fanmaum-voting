import {
  Args,
  ID,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { VotingStatisticsDto } from './dto/voting-statistics.dto';

@Resolver(() => VoteDto)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  @Query(() => VoteDto)
  async vote(
    @Args('id', { type: () => ID }, ParseBigIntPipe) id: bigint,
  ): Promise<VoteDto> {
    return this.voteService.getVoteById(id);
  }

  // 왜 GraphQL은 BigInt를 지원하지 않는가
  @ResolveField('id', () => Int)
  voteId(@Parent() vote: VoteDto): number {
    return Number(vote.id);
  }

  @ResolveField('votingStatistics', () => [VotingStatisticsDto])
  async votingStatistics(
    @Parent() vote: VoteDto,
  ): Promise<VotingStatisticsDto[]> {
    return (await this.voteService.getLeaderboardOfVote(vote.id)).map(
      (statistics) =>
        <VotingStatisticsDto>{
          starId: statistics.starId,
          vote: vote,
          voteId: vote.id,
          count: statistics._count.starId,
        },
    );
  }
}
