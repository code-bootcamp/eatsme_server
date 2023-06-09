import { IContext } from 'src/commons/interfaces/context';
import { CreateCommentInput } from '../dto/create-comment.input';
import { UpdateCommentInput } from '../dto/update-comment.input';

export interface ICommentsServiceCreate {
  createCommentInput: CreateCommentInput;
  context: IContext;
}

export interface ICommentsServiceUpdate {
  updateCommentInput: UpdateCommentInput;
  userId?: string;
}

export interface ICommentServiceNullList {
  comment: string;
}

export interface ICommentServiceCheckUser {
  userId: string;
  commentId: string;
}

export interface ICommentsServiceFindOne {
  commentId: string;
}

export interface ICommentsServiceDelete {
  commentId: string;
  userId?: string;
}
