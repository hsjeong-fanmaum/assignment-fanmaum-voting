import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserResultDto } from '../user/dto/user.response.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/auth.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    loginId: string,
    plainPassword: string,
  ): Promise<LoginResponseDto> {
    const user: UserResultDto = await this.userService.findByLoginId(loginId);

    const { password, ...userWithoutPassword } = user;

    if (!bcrypt.compareSync(plainPassword, password)) {
      //에러메시지는 외부인에게 어디서 문제가 생겼는지 알려주지 않기 위해 일부러 통일
      throw new NotFoundException(`id: ${loginId} not found`);
    }

    const accessToken: string =
      await this.jwtService.signAsync(userWithoutPassword);

    return {
      accessToken,
    };
  }
}
