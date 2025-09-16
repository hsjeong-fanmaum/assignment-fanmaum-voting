import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { StarDto } from './dto/star.dto';
import { StarService } from './star.service';
import { ParseBigIntPipe } from '../common/parse-big-int.pipe';

@Resolver(() => StarDto)
export class StarResolver {
  constructor(private starService: StarService) {}

  @Query(() => StarDto)
  async star(
    @Args('id', { type: () => ID }, ParseBigIntPipe) id: bigint,
  ): Promise<StarDto> {
    return this.starService.getStarById(id);
  }
}
