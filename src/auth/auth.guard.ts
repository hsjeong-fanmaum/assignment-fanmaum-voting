import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from './jwt.token.payload';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext & { contextType: string },
  ): Promise<boolean> {
    let request: Request;
    switch (context.contextType) {
      case 'http':
        request = context.switchToHttp().getRequest();
        break;

      case 'graphql':
        request = <Request>GqlExecutionContext.create(context).getContext<{
          req: { headers: { authorization: string } };
        }>().req;
        break;

      default:
        throw new UnsupportedMediaTypeException('');
    }

    const [type, token]: string[] =
      request.headers?.authorization?.split(' ') ?? [];
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
