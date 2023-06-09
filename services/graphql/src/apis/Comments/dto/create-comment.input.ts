import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
 @Field(() => String)
 comment: string;

 @Field(() => String)
 boardId: string;
}