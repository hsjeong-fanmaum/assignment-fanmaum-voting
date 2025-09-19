import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class JwtTokenPayloadDto {
  @Expose()
  @Type(() => BigInt)
  id: bigint;

  @Expose()
  loginId: string;
}
