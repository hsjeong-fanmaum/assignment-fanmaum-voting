import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LoginResolver } from './login.resolver';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 4 * 60 * 60 },
    }),
  ],
  providers: [AuthService, LoginResolver],
  controllers: [AuthController],
})
export class AuthModule {}
