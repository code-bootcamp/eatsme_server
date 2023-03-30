import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateReplyInput {
  @Field(() => String)
  reply: string;

  @Field(() => String)
  replyId: string;
}
