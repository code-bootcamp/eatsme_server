import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCommentInput {
 @Field(() => String)
 comment: string;

 // @Field(() => String)
 // boardCommentsId: string;

 // @Field(() => String)
 // repliesId: string;

 // @Field(() => String)
 // alarmsId: string;
}