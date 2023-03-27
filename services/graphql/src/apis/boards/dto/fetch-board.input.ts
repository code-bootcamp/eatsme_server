import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchBoardInput {
  @Field(() => String)
  boardId: string;

  @Field(() => [String])
  restaurantIds: string[];
}
