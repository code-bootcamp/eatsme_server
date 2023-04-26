import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmResolver, AlarmController } from './alarms.resolver';
import { AlarmService } from './alarms.service';
import { Alarm } from './entities/alarm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Alarm, //
    ]),
  ],
  controllers: [
    AlarmController, //
  ],
  providers: [
    AlarmService, //
    AlarmResolver,
  ],

  exports: [
    AlarmService, //
  ],
})
export class AlarmModule {}
