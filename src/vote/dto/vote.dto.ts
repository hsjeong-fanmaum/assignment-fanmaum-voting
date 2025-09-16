import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VotingLogDto } from './voting-log.dto';

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

  @Field(() => [VotingLogDto])
  votingLogs: VotingLogDto[];
}
