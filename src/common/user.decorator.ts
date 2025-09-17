import {
  createParamDecorator,
  ExecutionContext,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { JwtTokenPayload } from '../auth/jwt.token.payload';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (
    data: keyof JwtTokenPayload,
    context: ExecutionContext & { contextType: string },
  ) => {
    let request: { user: JwtTokenPayload };
    switch (context.contextType) {
      case 'http':
        request = context.switchToHttp().getRequest();
        break;

      case 'graphql':
        request = GqlExecutionContext.create(context).getContext<{
          req: { user: JwtTokenPayload };
        }>().req;
        break;

      default:
        throw new UnsupportedMediaTypeException('');
    }
    const user: JwtTokenPayload = request.user;

    return data ? user?.[data] : user;
  },
);
