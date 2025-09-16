import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VotingStatisticsDto } from './voting-statistics.dto';

@ObjectType('Vote')
export class VoteDto {
  @Field(() => ID)
  id: bigint;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date)
  endedAt: Date;

  @Field(() => [VotingStatisticsDto])
  votingStatistics?: VotingStatisticsDto[];
}
