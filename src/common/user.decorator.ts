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
        // 이 부분은 Type 단언을 하지 않으면 getContext()의 결과값이 any 타입으로 취급되어 ESlint 경고가 발생합니다.
        // 이에 따라 코드를 작성했는데, 다른 방식(getContext의 type을 별도로 확인하는 코드 작성)을 희망하시면 이에 따라 수정하겠습니다.
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
