import { Type } from 'class-transformer';
import { VoteStatus } from './vote.enum';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchVoteRequestDto {
  @Type(() => Number)
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;
  @Type(() => Number)
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  size?: number;
  //enum value를 string으로 해놔서 그런지 형변환 안 해도 잘 돌아가긴 하더라고요
  @IsOptional()
  @IsIn(Object.keys(VoteStatus))
  status?: VoteStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
