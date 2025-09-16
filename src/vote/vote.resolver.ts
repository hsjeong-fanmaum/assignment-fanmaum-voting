import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';
import { VoteResultDto } from './dto/vote.response.dto';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';

@Resolver(() => VoteDto)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  @Query(() => VoteDto)
  async vote(
    @Args('id', { type: () => ID }, ParseBigIntPipe) id: bigint,
  ): Promise<VoteResultDto> {
    return this.voteService.getVoteById(id);
  }
}
