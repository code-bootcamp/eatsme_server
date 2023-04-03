import { IContext } from 'src/commons/interfaces/context';

export interface IBoardsServiceToggleLike {
  boardId: string;
  context: IContext;
}
export interface IToggleLikeServicefindToggleLikeIds {
  context: IContext;
}
