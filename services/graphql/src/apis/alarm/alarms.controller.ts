import { Controller, Get, Req, Sse, UseInterceptors } from "@nestjs/common";
import { Request } from 'express';
import { from, Observable } from "rxjs";
import { AlarmService } from "./alarms.service";
import { map } from 'rxjs/operators';

@Controller('alarms')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get('/stream') 
  @Sse('alarms') // SSE를 구현하는데 사용하는 데코레이터 
  streamAlarms(@Req() request: Request): Observable<any> {
    const userId = request.query.userId as string;
    return from(this.alarmService.findByUserId(userId)).pipe(
      map((alarms) =>
        alarms.map((alarm) => ({
          id: alarm.users.nickname,
          message: alarm.alarmMessage,
          type: alarm.comments ? 'comment' : 'reply',
        })),
      ),
    );
  }
}
