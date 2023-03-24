import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  //section정보가 없을 경우 db에 저장하지 못하게 만들었다.
  @Prop({ type: String, required: true })
  section: string;

  @Prop({ type: String })
  restaurantName: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Object })
  location: object;

  @Prop({ type: String })
  userRatingsTotal: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: [String] })
  openingDays: string[];

  @Prop({ type: String })
  rating: string;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
