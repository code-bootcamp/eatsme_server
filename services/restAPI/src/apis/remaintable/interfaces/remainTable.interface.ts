import { CreateReamintalbeInput } from '../dto/create-reamintable.input';
import {
  RemainTable,
  RemainTableDocument,
} from '../schemas/remaintable.schemas';

export interface IRemainTableReduceTable {
  _id: RemainTable['_id'];
  table: number;
}

export interface IRmainTableFindOne {
  createReamintalbeInput: CreateReamintalbeInput;
}

export interface IRemainTableServiceDelete {
  _id: string;
  table: number;
}
