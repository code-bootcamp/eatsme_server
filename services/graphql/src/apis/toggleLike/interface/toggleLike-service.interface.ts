import { IContext } from 'src/commons/interfaces/context';
import { ToggleLikeInput } from '../dto/toggle-Like.input';

export interface IBoardsServiceToggleLike {
  toggleLikeInput: ToggleLikeInput;
  context: IContext;
}
export interface IToggleLikeServicefindToggleLikeIds {
  context: IContext;
}
