import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Login')
export class LoginDto {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  loginId: string;
}
