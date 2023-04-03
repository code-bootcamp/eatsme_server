import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { IContext } from "src/commons/interfaces/context";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guards";
import { AlarmService } from "./alarms.service";


@Resolver()
export class AlarmResolver {
 constructor(private readonly alarmsService: AlarmService) {}

 @UseGuards(GqlAuthGuard('access'))
 @Query(() => String)
 deleteAlarm(
  @Args('alarmId') alarmId: string,
  @Context() context: IContext,
 ): Promise<string> {
  const userId = context.req.user.id
  return this.alarmsService.delete({ alarmId, userId })
 }
}
