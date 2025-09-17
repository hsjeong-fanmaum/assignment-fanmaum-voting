import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver, } from '@nestjs/graphql';
import { VotingStatisticsDto } from './dto/voting-statistics.dto';
import { VoteService } from './vote.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';
import { VoteDto } from './dto/vote.dto';
import { StarDto } from '../star/dto/star.dto';
import { StarService } from '../star/star.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../common/user.decorator';

@Resolver(() => VotingStatisticsDto)
export class VotingStatisticsResolver {
  constructor(
    private voteService: VoteService,
    private starService: StarService,
  ) {}

  @Query(() => VotingStatisticsDto)
  async votingStatistics(
    @Args('voteId', { type: () => Int }, ParseBigIntPipe) voteId: bigint,
    @Args('starId', { type: () => Int }, ParseBigIntPipe) starId: bigint,
  ): Promise<VotingStatisticsDto> {
    return {
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

  @ResolveField('star', () => StarDto)
  async star(
    @Parent() votingStatistics: VotingStatisticsDto,
  ): Promise<StarDto> {
    return await this.starService.getStarById(votingStatistics.starId);
  }

  @Mutation(() => VotingStatisticsDto)
  @UseGuards(AuthGuard)
  async addVotingLog(
    @User('id') userId: bigint,
    @Args({ name: 'voteId', type: () => ID }, ParseBigIntPipe) voteId: bigint,
    @Args({ name: 'starId', type: () => ID }, ParseBigIntPipe) starId: bigint,
  ): Promise<VotingStatisticsDto> {
    await this.voteService.addVotingLog(voteId, starId, userId);
    return this.votingStatistics(voteId, starId);
  }
}
