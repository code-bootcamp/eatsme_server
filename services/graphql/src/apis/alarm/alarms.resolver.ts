import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/interfaces/context";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guards";
import { AlarmService } from "./alarms.service";
import { Alarm } from "./entities/alarm.entity";


@Resolver('Alarm')
export class AlarmResolver {
  constructor(private alarmsService: AlarmService) {}
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Alarm]) 
  alarms(
   @Context() context: IContext,
   ) {
    const userId =context.req.user.id
    return this.alarmsService.findByUserId({userId})
   }
}
