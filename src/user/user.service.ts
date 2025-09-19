import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupRequestDto } from './dto/user.request.dto';
import { UserResultDto } from './dto/user.response.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //회원가입: 새로운 회원정보 저장
  async signup(signupData: SignupRequestDto): Promise<UserResultDto> {
    return this.prisma.user.create({
      data: {
        loginId: signupData.loginId,
        //salt rounds 하드코딩(10)
        password: bcrypt.hashSync(signupData.password, 10),
      },
    });
  }

  async findByLoginId(loginId: string): Promise<UserResultDto> {
    const findResult: UserResultDto | null = await this.prisma.user.findUnique({
      select: {
        id: true,
        loginId: true,
        password: true,
      },
      where: {
        loginId: loginId,
      },
    });

    if (!findResult) {
      throw new NotFoundException(`id: ${loginId} not found`);
    }
    return findResult;
  }
}
