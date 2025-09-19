import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBigIntPipe implements PipeTransform<string> {
  // @nestjs/common의 parseIntPipe 코드도 metadata 변수를 사용하지 않았으나,
  // metadata 변수를 그대로 두면 eslint 경고가 발생해 경고를 무시하는 변수를 사용했습니다.
  // 다른 진행방향 추천해주신다면 따라서 수정하도록 하겠습니다.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string | undefined, metadata: ArgumentMetadata) {
    if (value === undefined) {
      return undefined;
    }

    // @nestjs/common의 parseIntPipe 코드에서 필터링하는 방식과 비슷하게 적용했습니다.
    if (!/^-?\d+$/.test(value)) {
      // throw를 명시하지 않으면 500이 반환되어 명시가 필요합니다.
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }

    return BigInt(value);
  }
}
