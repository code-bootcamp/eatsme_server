import { User } from 'src/apis/users/entities/user.entity';
import { CreateBoardInput } from '../dto/create-board.input';
import { ToggleLikeInput } from '../../toggleLike/dto/toggle-Like.input';
import { UpdateBoardInput } from '../dto/update-board.input';
import { IContext } from 'src/commons/interfaces/context';
import { FetchBoardsByEveryInput } from '../dto/fetch-board-secton.input';

export interface IBoardsServiceFetchBoard {
  boardId: string;
}
export interface IBoardsServiceMyFetchBoard {
  context: IContext;
}

export interface IBoardsServiceFindByBoardId {
  boardId: string;
}

export interface IBoardsServiceFindByUser {
  context: IContext;
}

export interface IBoardsServiceFindByEvery {
  fetchBoardsByEveryInput: FetchBoardsByEveryInput;
}

export interface IBoardsServiceFindArea {
  startArea?: string;
  endArea?: string;
}

export interface IBoardsServiceFindSection {
  fetchBoardsByEveryInput: FetchBoardsByEveryInput;
}

export interface IBoardsServiceNullCheckTitle {
  title: string;
}

export interface IBoardsServiceNullCheckList {
  title: string;
  startPoint: string;
  endPoint: string;
}

export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
  context: IContext;
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
  context: IContext;
}

export interface IBoardsServiceDelete {
  boardId: string;
  context: IContext;
}
