import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCommentInput } from "./create-comment.input";

@InputType() //서버로 전송되는 데이터를 정의하는 데 사용
export class UpdateCommentInput extends PartialType(CreateCommentInput) {
 @Field()
 commentId?: string; // ?의미는 옵셔널을 나타내는 기호로 값이 있을수도 없을수도 있다는걸 의미
}