import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateReplyInput } from "./create-reply.input";

@InputType() 
export class UpdateReplyInput extends PartialType(CreateReplyInput) {
 @Field()
 replyId?: string; 
}