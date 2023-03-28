import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guards";
import { AlarmService } from "./alarmsservice";
import { Alarm } from "./entities/alarm.entity";


@Resolver('Alarm')
export class AlarmResolver {
  constructor(private alarmsService: AlarmService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Alarm]) 
  alarms(
   @Args('userId') userId: string) {
    return this.alarmsService.findByUserId(userId)
   }
  
}
