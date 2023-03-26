import { CreateBoardMapInput } from "../dto/create-bard-map.input";
import { CreateBoardInput } from "../dto/create-board.input";
import { UpdateBoardInput } from "../dto/update-board.input";

export interface IBoardsServiceFindOne {
 boardId: string;
}

export interface IBoardsServiceNullCheckTitle {
 course: string;

}

export interface IBoardsServiceNullCheckList {
  course: string,
  startPoint: string,
  endPoint: string,
}

export interface IBoardsServiceCreate {
//  createBoardMapInput: CreateBoardMapInput[],
 createBoardInput: CreateBoardInput;
 userId: string;
}

export interface IBoardsServiceUpdate {
 updateBoardInput: UpdateBoardInput;
}

export interface IBoardsServiceDelete {
  boardId: string;
 }

