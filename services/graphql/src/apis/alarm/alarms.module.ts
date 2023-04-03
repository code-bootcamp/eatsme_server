import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmController } from "./alarms.controller";
import { AlarmResolver } from "./alarms.resolver";
import { AlarmService } from "./alarms.service";
import { Alarm } from "./entities/alarm.entity";



@Module({
 imports: [
  TypeOrmModule.forFeature([
   Alarm,
  ])
 ],
 providers: [
   AlarmService,
   AlarmResolver
 ],
 controllers: [
  AlarmController,
 ]
})

export class AlarmModule {}