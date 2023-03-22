import { CreateBoardInput } from "../dto/create-board.input";
import { UpdateBoardInput } from "../dto/update-board.input";

export interface IBoardsServiceFindOne {
 boardId: string;
}

export interface IBoardsServiceNullCheckTitle {
 title: string;

}

export interface IBoardsServiceNullCheckList {
  title: string,
  startPoint: string,
  endPoint: string,
}

export interface IBoardsServiceCreate {
 createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceUpdate {
 boardId: string,
 updateBoardInput: UpdateBoardInput;
}

