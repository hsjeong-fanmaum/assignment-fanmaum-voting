import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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

  @Query(() => [StarDto])
  async searchStar(
    @Args('q', { type: () => String, nullable: true }) keyword?: string,
  ): Promise<StarDto[]> {
    return this.starService.searchStar(keyword);
  }

  // 왜 GraphQL은 BigInt를 지원하지 않는가
  @ResolveField('id', () => ID)
  starId(@Parent() star: StarDto): string {
    return String(star.id);
  }
}
