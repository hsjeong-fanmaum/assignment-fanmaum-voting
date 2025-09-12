import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class JwtTokenPayload {
  @Expose()
  @Type(() => BigInt)
  id: bigint;

  @Expose()
  loginId: string;
}
