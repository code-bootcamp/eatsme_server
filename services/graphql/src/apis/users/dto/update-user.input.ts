import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  userImg?: string;
}
