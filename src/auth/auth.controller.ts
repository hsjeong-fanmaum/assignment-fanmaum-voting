import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  ForbiddenException,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { JwtTokenPayloadDto } from './dto/jwt.token.payload.dto';
import { LoginRequestDto } from './dto/auth.request.dto';
import { LoginResponseDto } from './dto/auth.response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../common/user.decorator';
import { UserService } from '../user/user.service';
import { UserResultDto } from '../user/dto/user.response.dto';
import { SignupRequestDto } from '../user/dto/user.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: UserResultDto })
  @Post('/signup')
  async signup(@Body() signupData: SignupRequestDto): Promise<UserResultDto> {
    //loginId unique 로직 작성 필요
    return this.userService.signup(signupData);
  }

  @Post('/login')
  async signIn(
    @Body() { loginId, password }: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.signIn(loginId, password);
  }

  // 인증 로직 동작 확인용 API
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: JwtTokenPayloadDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/info')
  getTokenData(@User() user: JwtTokenPayloadDto): JwtTokenPayloadDto {
    //이 API를 실제로 사용해서는 안 됨
    if (process.env.NODE_ENV === 'prod') {
      throw new ForbiddenException();
    }
    console.log(user);
    return user;
  }
}
