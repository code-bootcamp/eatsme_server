import { User } from 'src/apis/users/entities/user.entity';
import { CreateBoardInput } from '../dto/create-board.input';
import { FetchBoardsBySectionInput } from '../dto/fetch-board-secton.input';
import { ToggleLikeInput } from '../../toggleLike/dto/toggle-Like.input';
import { UpdateBoardInput } from '../dto/update-board.input';
import { IContext } from 'src/commons/interfaces/context';

export interface IBoardsServiceFetchBoard {
  boardId: string;
}
export interface IBoardsServiceMyFetchBoard {
  context: IContext;
}
export interface IBoardsServiceFindOne {
  boardId: string;
}

export interface IBoardsServiceFindArea {
  startArea?: string;
  endArea?: string;
}

export interface IBoardsServiceFindSection {
  fetchBoardsBySectionInput: FetchBoardsBySectionInput;
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
  id: string;
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
}

export interface IBoardsServiceDelete {
  boardId: string;
}
