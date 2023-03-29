import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Alarm } from "./entities/alarm.entity";

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
  ) {}

  async createCommentAlarm(commentId: any, authorId: any, commentUserId: any, commentUserName: any) {
    const alarm = new Alarm();
    alarm.isAlarm = true;
    alarm.users = authorId;
    alarm.comments = commentId;
    alarm.commentUserId = commentUserId;
    alarm.commentUserName = commentUserName;
    await this.alarmRepository.save(alarm);
  }

  async createReplyAlarm(replyId: any, authorId: any, commentUserId: any, commentUserName: any) {
    const alarm = new Alarm();
    alarm.isAlarm = true;
    alarm.users = authorId;
    alarm.replies = replyId;
    alarm.commentUserId = commentUserId;
    alarm.commentUserName = commentUserName;
    await this.alarmRepository.save(alarm);
  }

  async findByUserId(userId: string): Promise<Alarm[]> {
   return this.alarmRepository.find({ 
    where: { users: { id: userId } },
    relations: ['comments.board.user']
    });
 }
}