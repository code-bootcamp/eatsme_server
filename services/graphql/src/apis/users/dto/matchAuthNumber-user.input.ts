import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MatchAuthNumberInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  authNumber: string;
}
