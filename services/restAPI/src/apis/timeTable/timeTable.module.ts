import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeTableSchema } from './schemas/timeTable.schemas';
import { TimeTablesService } from './timeTable.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TimeTable', schema: TimeTableSchema }, //
    ]),
  ],
  providers: [
    TimeTablesService, //
  ],
  exports: [
    TimeTablesService, //
  ],
})
export class TimeTableModule {}
