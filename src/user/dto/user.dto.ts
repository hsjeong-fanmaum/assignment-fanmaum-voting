import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field(() => ID)
  id: bigint;

  @Field(() => String)
  loginId: string;

  //password는 제외
}
