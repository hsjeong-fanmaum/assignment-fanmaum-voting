import { Exclude } from 'class-transformer';

export class UserResultDto {
  id: bigint;

  loginId: string;

  @Exclude() // return 시 보이지 않게 설정
  password: string;
}
