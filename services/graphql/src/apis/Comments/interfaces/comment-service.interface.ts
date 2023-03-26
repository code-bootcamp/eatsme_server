import { CreateCommentInput } from "../dto/create-comment.input";

export interface ICommentsServiceCreate {
 boardId: string;
 createCommentInput: CreateCommentInput;
}

export interface ICommentServiceNullList {
 comment: string;
}

