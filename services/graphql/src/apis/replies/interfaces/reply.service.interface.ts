import { IContext } from 'src/commons/interfaces/context';
import { CreateReplyInput } from '../dto/create-reply.input';
import { UpdateReplyInput } from '../dto/update.reply.input';

export interface IReplysServiceFindOne {
  replyId: string;
}

export interface IReplyServiceNullList {
  reply: string;
}

export interface IReplyServiceCheckUser {
  userId: string;
  replyId: string;
}

export interface IReplysServiceCreate {
  createReplyInput: CreateReplyInput;
  context: IContext;
}

export interface IReplysServiceUpdate {
  updateReplyInput: UpdateReplyInput;
  userId?: string;
}

export interface IReplysServiceDelete {
  replyId: string;
  userId?: string;
}
