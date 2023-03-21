import { CreateBoardInput } from "../dto/create-board.input";

export interface IBoardsServiceFindOne {
 boardId: string;
}

export interface IBoardServiceNullCheckTitle {
 title: string;

}

export interface IBoardServiceNullCheckList {
 startPoint?: string;
 endPoint?: string;
 title?: string;
}

export interface IBoardServiceCreate {
 createBoardInput: CreateBoardInput;
}


