import { CreateBoardInput } from '../dto/create-board.input';
import { FetchBoardsBySectionInput } from '../dto/fetch-board-secton.input';
import { FetchBoardInput } from '../dto/fetch-board.input';
import { ToggleLikeInput } from '../../toggleLike/dto/toggle-Like.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceFetchBoard {
  boardId: string;
}
export interface IBoardsServiceMyFetchBoard {
  userId: string;
}
export interface IBoardsServiceFindOne {
  boardId: string;
}

export interface IBoardsServiceFindArea {
  area: string;
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
  userId: string;
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
}

export interface IBoardsServiceDelete {
  boardId: string;
}
