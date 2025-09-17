import {
  Args,
  ID,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => UserDto)
  signup(
    @Args('loginId', { type: () => String }) loginId: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<UserDto> {
    //loginId unique 로직 작성 필요
    return this.userService.signup({ loginId, password });
  }

  // 왜 GraphQL은 BigInt를 지원하지 않는가
  @ResolveField('id', () => ID)
  userId(@Parent() vote: UserDto): string {
    return String(vote.id);
  }
}
