import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Alarm } from "./entities/alarm.entity";
import { IAlarmServiceCreate, IAlarmServiceDelete, IAlarmServiceFindByUserId } from "./interface/alarm-service.interface";

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
  ) {}

  // 댓글 및 대댓글알람 생성기능
  async createAlarm({ commentId, authorId, commentUserImg, alarmMessage }: IAlarmServiceCreate) {
    const alarm = this.alarmRepository.create({
      users: { id: authorId },
      comments: { id: commentId },
      commentUserImg: commentUserImg,
      alarmMessage: alarmMessage,
    });
    await this.alarmRepository.save(alarm);
  }

  async findByUserId({userId}: IAlarmServiceFindByUserId): Promise<Alarm[]> {
   return this.alarmRepository.find({ 
    where: { users: { id: userId } },
    relations: ['comments']
    });
 }

 // 알람 확인시 삭제기능
 async delete({ alarmId }: IAlarmServiceDelete): Promise<string> {
  const alarm = await this.alarmRepository.findOne({ where: { id: alarmId }});
  if (!alarm) {
    return '알람이 존재하지않습니다';
  }
  alarm.isAlarm = false; 
  await this.alarmRepository.save(alarm);
  return '알람이 삭제되었습니다';
  }
}
