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
    } else {
      try {
        return BigInt(value);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        throw new BadRequestException(
          'Validation failed (numeric string is expected)',
        );
      }
    }
  }
}
