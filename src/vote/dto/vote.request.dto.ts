import { Type } from 'class-transformer';
import { VoteStatus } from '../vote.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
  @ApiProperty({ enum: VoteStatus, enumName: 'VoteStatus', required: false })
  @IsOptional()
  @IsEnum(VoteStatus)
  status?: VoteStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}

export class AddVotingLogRequestDto {
  @ApiProperty()
  @Type(() => BigInt)
  // ... 근데 여기에 validation 안 둬도 되나요? BigInt 변환 안되면 400 Bad Request가 반환되더라고요.
  starId: bigint;
}

export class AddVoteRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @Type(() => Date)
  startedAt: Date;

  @ApiProperty()
  @Type(() => Date)
  endedAt: Date;
}
