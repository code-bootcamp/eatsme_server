import { Controller, Get, Req, Sse, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { Request } from 'express';
import { from, map, Observable } from 'rxjs';
import { AlarmService } from './alarms.service';

@Resolver()
export class AlarmResolver {
  constructor(private readonly alarmsService: AlarmService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  deleteAlarm(
    @Args('alarmId') alarmId: string,
    @Context() context: IContext,
  ): Promise<string> {
    const userId = context.req.user.id;
    return this.alarmsService.deleteAlarm({ alarmId, userId });
  }
}

@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get('/stream')
  @Sse('alarms')
  streamAlarms(
    @Req() request: Request, //
  ): Observable<any> {
    const userId = request.query.userId as string;
    return from(this.alarmService.findByUserId({ userId })).pipe(
      map((alarms) =>
        alarms.map((alarm) => ({
          id: alarm.users.nickname,
          message: alarm.alarmMessage,
          type: alarm.comments ? 'comment' : 'reply',
          alarmId: alarm.id,
        })),
      ),
    );
  }
}
