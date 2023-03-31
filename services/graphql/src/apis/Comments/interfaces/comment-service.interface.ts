import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';

export interface ICommentsServiceCreate {
  createCommentInput: CreateCommentInput;
  userId?: string;
}

export interface ICommentsServiceUpdate {
  updateCommentInput: UpdateCommentInput;
}

export interface ICommentServiceNullList {
  comment: string;
}

export interface ICommentsServiceFindOne {
  commentId: string;
}

export interface ICommentsServiceDelete {
  commentId: string;
}
