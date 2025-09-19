import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { LoginResponseDto } from './dto/auth.response.dto';

@Resolver(() => LoginDto)
export class LoginResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Query(() => LoginDto)
  async signIn(
    @Args('loginId', { type: () => String }) loginId: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<LoginDto> {
    const signInResult: LoginResponseDto = await this.authService.signIn(
      loginId,
      password,
    );

    return {
      ...signInResult,
      loginId,
    };
  }

  @ResolveField('user', () => UserDto)
  async user(@Parent() login: LoginDto): Promise<UserDto> {
    return this.userService.findByLoginId(login.loginId);
  }
}
