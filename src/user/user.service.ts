import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupRequestDto } from './user.request.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //회원가입: 새로운 회원정보 저장
  async signup(signupData: SignupRequestDto): Promise<void> {
    await this.prisma.user.create({
      data: {
        loginId: signupData.loginId,
        password: signupData.password,
      },
    });
  }
}
