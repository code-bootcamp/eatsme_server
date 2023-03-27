import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchBoardsBySectionInput {
  @Field(() => String)
  area: string;

  @Field(() => String)
  startPoint: string;

  @Field(() => String, { nullable: true })
  endPoint: string;
}
