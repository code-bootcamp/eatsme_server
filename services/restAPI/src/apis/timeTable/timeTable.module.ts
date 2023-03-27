import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeTableSchema } from './schemas/timeTable.schemas';
import { TimeTalbesService } from './timeTable.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TimeTable', schema: TimeTableSchema }, //
    ]),
  ],
  providers: [
    TimeTalbesService, //
  ],
  exports: [
    TimeTalbesService, //
  ],
})
export class TimeTableModule {}
