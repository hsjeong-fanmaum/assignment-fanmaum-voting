import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayloadDto } from './dto/jwt.token.payload.dto';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext & { contextType: string },
  ): Promise<boolean> {
    let request: { headers: { authorization: string } };
    switch (context.contextType) {
      case 'http':
        request = context.switchToHttp().getRequest();
        break;

      case 'graphql':
        // 이 부분은 Type 단언을 하지 않으면 getContext()의 결과값이 any 타입으로 취급되어 ESlint 경고가 발생합니다.
        // 이에 따라 코드를 작성했는데, 다른 방식(getContext의 type을 별도로 확인하는 코드 작성)을 희망하시면 이에 따라 수정하겠습니다.
        request = GqlExecutionContext.create(context).getContext<{
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
      const payload: JwtTokenPayloadDto = await this.jwtService.verifyAsync(
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
