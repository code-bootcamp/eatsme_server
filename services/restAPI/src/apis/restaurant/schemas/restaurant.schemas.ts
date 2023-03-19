import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  formatted_address: string;

  @Prop()
  geometryLocation: object;

  @Prop()
  user_ratings_total: string;

  @Prop()
  formatted_phone_number: string;

  @Prop()
  opening_hoursWeekday_text: object;

  @Prop()
  rating: string;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
