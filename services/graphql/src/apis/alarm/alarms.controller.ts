import { Controller, Get, Req, Sse } from "@nestjs/common";
import { Request } from 'express';
import { from, Observable } from "rxjs";
import { AlarmService } from "./alarms.service";
import { map } from 'rxjs/operators';


@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get('/stream')
  @Sse('alarms')
  streamAlarms(@Req() request: Request): Observable<any> {
    const userId = request.query.userId as string;
    return from(this.alarmService.findByUserId({userId})).pipe(
      map((alarms) =>
        alarms.map((alarm) => ({
          id: alarm.users.nickname,
          message: alarm.alarmMessage,
          userImg: alarm.commentUserImg,
          type: alarm.comments ? 'comment' : 'reply',
          alarmId: alarm.id,
        })),
      ),
    );
  }

  @Delete('/:alarmId')
@UseGuards(GqlAuthGuard('access'))
async deleteAlarm(
  @Param('alarmId') alarmId: string,
  @Context() context: IContext,
): Promise<string> {
  const userId = context.req.user.id;
  await this.alarmService.deleteAlarm({ userId, alarmId });
  return '알람이 삭제되었습니다';
}
}
