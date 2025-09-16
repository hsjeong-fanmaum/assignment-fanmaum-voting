import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Vote')
export class Vote {
  @Field(() => Int)
  id: bigint;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date)
  endedAt: Date;

  @Field(() => [VotingLog])
  votingLogs: VotingLog[];
}

@ObjectType('VotingLog')
export class VotingLog {
  @Field(() => Int)
  id: bigint;

  @Field(() => Boolean)
  valid: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Vote)
  vote: Vote;
}
