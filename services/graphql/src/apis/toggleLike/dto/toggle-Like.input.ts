import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ToggleLikeInput {
  @Field(() => String)
  boardId: string;

  @Field(() => Boolean)
  isLike: boolean;
}
