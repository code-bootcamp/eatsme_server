import { Field } from '@nestjs/graphql';
import { CreateBoardInput } from '../dto/create-board.input';
import { FetchBoardsBySectionInput } from '../dto/fetch-board-secton.input';
import { FetchBoardInput } from '../dto/fetch-board.input';
import { UpdateBoardInput } from '../dto/update-board.input';

export interface IBoardsServiceFetchBoard {
  fetchBoardInput: FetchBoardInput;
}

export interface IBoardsServiceFetchBoardReturn {
  id: string;
  title: string;
  createdAt: Date;
  boardImg: string;
  startPoint: string;
  endPoint: string;
  customName: string;
  like: number;
  restaurantIds: string[];
  data: {
    restaurantName: string; //
    address: string;
    rating: string;
  }[];
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
}

export interface IBoardsServiceUpdate {
  updateBoardInput: UpdateBoardInput;
}

export interface IBoardsServiceDelete {
  boardId: string;
}
