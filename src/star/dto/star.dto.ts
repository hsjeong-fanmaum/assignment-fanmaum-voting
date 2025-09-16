import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Star')
export class StarDto {
  @Field(() => ID)
  id: bigint;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  profileImageUrl: string | null;
}
