import { CreateBoardInput } from "../dto/create-board.input";
import { UpdateBoardInput } from "../dto/update-board.input";

export interface IBoardsServiceFindOne {
 boardId: string;
}

export interface IBoardsServiceNullCheckTitle {
 title: string;

}

export interface IBoardsServiceNullCheckList {
 startPoint: string;
 endPoint: string;
 title: string;
}

export interface IBoardsServiceCreate {
 createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceUpdate {
 boardId: string;
 updateBoardInput: UpdateBoardInput;
}

