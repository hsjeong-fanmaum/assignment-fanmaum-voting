import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtTokenPayload } from '../auth/jwt.token.payload';

export const User = createParamDecorator(
  (data: keyof JwtTokenPayload, ctx: ExecutionContext) => {
    const request: Request & { user: JwtTokenPayload } = ctx
      .switchToHttp()
      .getRequest();
    const user: JwtTokenPayload = request.user;

    return data ? user?.[data] : user;
  },
);
