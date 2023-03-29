import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
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
   AlarmResolver,
   AlarmService,
 ],
})

export class AlarmModule {}