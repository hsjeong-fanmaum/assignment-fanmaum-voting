import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VoteDto } from './vote.dto';

@ObjectType('VotingLog')
export class VotingLogDto {
  @Field(() => ID)
  id: bigint;

  @Field(() => Boolean)
  valid: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => VoteDto)
  vote: VoteDto;
}
