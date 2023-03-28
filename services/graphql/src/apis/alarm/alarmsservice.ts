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

  async createCommentAlarm(commentId: any, authorId: any) {
    const alarm = new Alarm();
    alarm.isAlarm = true;
    alarm.users = authorId;
    alarm.comments = commentId;
    await this.alarmRepository.save(alarm);
  }

  async findByUserId(userId: string): Promise<Alarm[]> {
   console.log(userId)
   return this.alarmRepository.find({ 
    where: { users: { id: userId } },
    relations: ['comments']
    });
 }
}