import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITimeTableFindOne } from './interfaces/timeTable.interface';
import { TimeTableDocument } from './schemas/timeTable.schemas';

@Injectable()
export class TimeTalbesService {
  constructor(
    @InjectModel('TimeTable')
    private readonly timeTableModel: Model<TimeTableDocument>,
  ) {}

  findOne({ _id }: ITimeTableFindOne): Promise<TimeTableDocument> {
    return this.timeTableModel.findOne({ _id }).exec();
  }
}
