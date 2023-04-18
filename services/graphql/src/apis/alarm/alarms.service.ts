import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alarm } from './entities/alarm.entity';
import {
  IAlarmServiceCreate,
  IAlarmServiceDelete,
  IAlarmServiceFindByUserId,
} from './interface/alarm-service.interface';

@Injectable()
export class AlarmService {
  constructor(
    @InjectRepository(Alarm)
    private alarmRepository: Repository<Alarm>,
  ) {}

  // 댓글 및 대댓글알람 생성기능
  async createAlarm({
    commentId,
    authorId,
    alarmMessage,
  }: IAlarmServiceCreate) {
    const alarm = this.alarmRepository.create({
      users: { id: authorId },
      comments: { id: commentId },
      alarmMessage: alarmMessage,
    });
  }

  async findByUserId({ userId }: IAlarmServiceFindByUserId): Promise<Alarm[]> {
    return this.alarmRepository.find({
      where: {
        users: {
          id: userId,
        },
      },
      relations: ['comments'],
    });
  }

  // 알람 확인시 삭제기능
  async deleteAlarm({ userId, alarmId }: IAlarmServiceDelete): Promise<string> {
    const alarm = await this.alarmRepository.findOne({
      where: {
        id: alarmId,
        users: {
          id: userId,
        },
      },
    });
    if (!alarm) {
      throw new NotFoundException('해당 알람을 찾을 수 없습니다.');
    }
    await this.alarmRepository.delete(alarm);
    return '알람이 삭제되었습니다';
  }
}
