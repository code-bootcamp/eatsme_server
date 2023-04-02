import { Board } from 'src/apis/boards/entities/board.entity';
import { PersonalMapData } from '../entities/personalMapData.entity';

export interface IPersonalMapServiceSavePersonalMapData {
  isSave: {
    board: Board;
    restaurantId: string;
    personalMapInfo: PersonalMapData;
  };
}
