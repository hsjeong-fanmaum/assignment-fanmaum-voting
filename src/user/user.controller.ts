import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupRequestDto } from './user.request.dto';
import { AddUserResultDto } from './user.response.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({ type: AddUserResultDto })
  @Post('/signup')
  async signup(
    @Body() signupData: SignupRequestDto,
  ): Promise<AddUserResultDto> {
    //loginId unique 로직 작성 필요
    //비밀번호 암호화 로직은 아후에 작성 예정
    return this.userService.signup(signupData);
  }
}
