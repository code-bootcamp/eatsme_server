import { Field } from '@nestjs/graphql';
import { CreateBoardInput } from '../dto/create-board.input';
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
