export interface IAlarmServiceFindByUserId{
    userId:string
}

export interface IAlarmServiceCreate{
  commentId: string;
  authorId: string;
  alarmMessage: string;
}

export interface IAlarmServiceDelete {
  userId: string;
  alarmId: string;
}