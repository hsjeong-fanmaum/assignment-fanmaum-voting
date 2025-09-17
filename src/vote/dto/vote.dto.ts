import { Field, ID, ObjectType } from '@nestjs/graphql';

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
}
