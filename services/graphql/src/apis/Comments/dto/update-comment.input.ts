import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCommentInput {
  @Field(() => String)
  comment: string;

  @Field(() => String)
  commentId: string;
}
