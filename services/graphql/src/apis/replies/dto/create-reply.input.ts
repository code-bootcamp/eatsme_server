import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateReplyInput {
 @Field(() => String)
 reply: string;

 @Field(() => String)
 commentId: string;
}