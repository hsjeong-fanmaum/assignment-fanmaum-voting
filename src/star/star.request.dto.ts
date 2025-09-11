import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddStarRequestDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}
