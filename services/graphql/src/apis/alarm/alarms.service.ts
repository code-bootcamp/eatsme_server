import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import console from "console";
import { Repository } from "typeorm";
import { Alarm } from "./entities/alarm.entity";

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
  ) {}

  // 댓글알람 생성기능
  async createCommentAlarm(commentId: string, authorId: string,  alarmMessage: string) {
    const alarm = this.alarmRepository.create({
      users: { id: authorId },
      comments: { id: commentId },
      alarmMessage: alarmMessage,
    });
    await this.alarmRepository.save(alarm);
  }

  // 대댓글알람 생성기능
  async createReplyAlarm(replyId: string, authorId: string,  alarmMessage: string) {
    const alarm = this.alarmRepository.create({
    users: { id: authorId },
    replies: { id: replyId },
    alarmMessage: alarmMessage,
    });
    await this.alarmRepository.save(alarm);
  }

  async findByUserId(userId: string): Promise<Alarm[]> {
   return this.alarmRepository.find({ 
    where: { users: { id: userId } },
    relations: ['comments']
    });
 }

 // 알람 확인시 삭제기능
 async deleteAlarm(alarmId: string): Promise<boolean> {
  const alarm = await this.alarmRepository.findOne({ where: {
    id: alarmId
  } });
  if (!alarm) {
    return false;
  }
  alarm.isAlarm = false;
  await this.alarmRepository.save(alarm);
  return true;
  }
}