import { Mutation, Resolver } from "@nestjs/graphql";
import { AlarmsService } from "./alarms.service";
import { Alarm } from "./entities/alarm.entity";

@Resolver()
export class AlarmsResolver {
 constructor(
  private readonly alarmsService: AlarmsService
 ) {}

 // @Mutation(() => Alarm)
 // createAlarm(

 // )
}