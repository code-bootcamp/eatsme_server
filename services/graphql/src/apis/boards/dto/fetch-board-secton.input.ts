import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchBoardsByEveryInput {
  @Field(() => String, { nullable: true })
  startArea: string;

  @Field(() => String, { nullable: true })
  endArea: string;

  @Field(() => String, { nullable: true })
  startPoint: string;

  @Field(() => String, { nullable: true })
  endPoint: string;
}
