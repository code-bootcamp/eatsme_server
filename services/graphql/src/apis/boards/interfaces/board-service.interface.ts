import { CreateBoardInput } from "../dto/create-board.input";

export interface IBoardsServiceFindOne {
 boardId: string;
}

export interface IBoardServiceNullCheckTitle {
 title: string;
}

export interface IBoardServiceNullCheckStartPoint {
 startPoint: string;
}

export interface IBoardServiceNullCheckEndPoint {
 endPoint: string;
}

export interface IBoardServiceCreate {
 createBoardInput: CreateBoardInput;
}


