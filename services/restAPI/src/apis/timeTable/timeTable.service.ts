import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  async findOne({ _id }: ITimeTableFindOne): Promise<TimeTableDocument> {
    const result = await this.timeTableModel.findOne({ _id }).exec();
    if (!result)
      throw new UnprocessableEntityException('예약 가능한 시간이 아닙니다.');

    return result;
  }
}
