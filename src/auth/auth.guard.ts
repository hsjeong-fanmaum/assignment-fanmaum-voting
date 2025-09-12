import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from './jwt.token.payload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const [type, token]: string[] =
      request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: JwtTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET,
        },
      );
      request['user'] = { ...payload, id: BigInt(payload.id) };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
