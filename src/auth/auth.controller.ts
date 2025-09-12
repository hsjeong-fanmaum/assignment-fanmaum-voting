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
import { JwtTokenPayload } from './jwt.token.payload';
import { LoginRequestDto } from './auth.request.dto';
import { LoginResponseDto } from './auth.response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async signIn(
    @Body() { loginId, password }: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.authService.signIn(loginId, password);
  }

  // 인증 로직 동작 확인용 API
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: JwtTokenPayload })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/info')
  getTokenData(@User() user: JwtTokenPayload): JwtTokenPayload {
    //이 API를 실제로 사용해서는 안 됨
    if (process.env.NODE_ENV === 'prod') {
      throw new ForbiddenException();
    }
    console.log(user);
    return user;
  }
}
