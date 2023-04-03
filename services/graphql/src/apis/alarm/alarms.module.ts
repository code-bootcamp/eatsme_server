import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmController } from './alarms.controller';
import { AlarmService } from './alarms.service';
import { Alarm } from './entities/alarm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Alarm, //
    ]),
  ],
  providers: [
    AlarmService, //
  ],
  controllers: [
    AlarmController, //
  ],
  exports: [
    AlarmService, //
  ],
})
export class AlarmModule {}
