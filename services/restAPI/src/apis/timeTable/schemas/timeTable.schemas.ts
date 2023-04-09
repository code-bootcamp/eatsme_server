import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeTableDocument = HydratedDocument<TimeTable>;

@Schema()
export class TimeTable {
  @Prop({ type: Number })
  _id: number;

  @Prop({ type: String })
  time: string;
}
export const TimeTableSchema = SchemaFactory.createForClass(TimeTable);
