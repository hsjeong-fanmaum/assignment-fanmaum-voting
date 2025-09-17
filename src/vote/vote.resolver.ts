import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { VotingStatisticsDto } from './dto/voting-statistics.dto';
import { SearchVoteGraphqlRequestDto } from './dto/vote.request.dto';

@Resolver(() => VoteDto)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  @Query(() => VoteDto)
  async vote(
    @Args('id', { type: () => ID }, ParseBigIntPipe) id: bigint,
  ): Promise<VoteDto> {
    return this.voteService.getVoteById(id);
  }

  @Query(() => [VoteDto])
  async searchVote(
    @Args('options', {
      type: () => SearchVoteGraphqlRequestDto,
      nullable: true,
    })
    { page, size, status, search }: SearchVoteGraphqlRequestDto,
  ): Promise<VoteDto[]> {
    return this.voteService.searchVote(page, size, status, search);
  }

  // 왜 GraphQL은 BigInt를 지원하지 않는가
  @ResolveField('id', () => ID)
  voteId(@Parent() vote: VoteDto): string {
    return String(vote.id);
  }

  @ResolveField('votingStatistics', () => [VotingStatisticsDto])
  async votingStatistics(
    @Parent() vote: VoteDto,
  ): Promise<VotingStatisticsDto[]> {
    const queryResult = await this.voteService.getLeaderboardOfVote(vote.id);
    return queryResult.map((statistics) => {
      return {
        starId: statistics.starId,
        voteId: vote.id,
        count: statistics._count.starId,
      };
    });
  }
}
