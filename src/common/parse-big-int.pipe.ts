import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseBigIntPipe implements PipeTransform<string> {
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
