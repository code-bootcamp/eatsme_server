import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmResolver } from "./alarmsresolver";
import { AlarmService } from "./alarmsservice";
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