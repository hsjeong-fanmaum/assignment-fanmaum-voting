import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Vote } from './vote.objecttype.dto';
import { VoteService } from './vote.service';
import { VoteResultDto } from './vote.response.dto';

@Resolver(() => Vote)
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  @Query(() => Vote)
  async vote(
    @Args('id', { type: () => Int }) id: bigint,
  ): Promise<VoteResultDto> {
    return this.voteService.getVoteById(id);
  }
}
