import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import { Restaurant } from 'src/apis/restaurant/schemas/restaurant.schemas';

export type RemainTableDocument = HydratedDocument<RemainTable>;

@Schema()
export class RemainTable {
  @Prop({ type: String, default: randomUUID })
  _id: string;

  @Prop({ type: Number, default: 20 })
  remainTable: number;

  @Prop({ type: Number })
  reservation_time: number;

  @Prop({ type: Restaurant })
  restaurant: Restaurant;
}
export const RemainTableSchema = SchemaFactory.createForClass(RemainTable);
