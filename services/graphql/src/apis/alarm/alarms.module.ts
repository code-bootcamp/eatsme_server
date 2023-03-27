import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmsResolver } from "./alarms.resolver";
import { AlarmsService } from "./alarms.service";
import { Alarm } from "./entities/alarm.entity";


@Module({
 imports: [
  TypeOrmModule.forFeature([
     Alarm,
  ])
 ],
 providers: [
  AlarmsResolver,
  AlarmsService,
 ],
})

export class AlarmModule {}