import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequestDto {
  @ApiProperty()
  @IsString()
  loginId: string;
  @ApiProperty()
  @IsString()
  password: string;
}
