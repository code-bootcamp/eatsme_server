import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop({ type: String, default: randomUUID })
  _id: string;

  @Prop({ type: String, required: true })
  section: string;

  @Prop({ type: String })
  restaurantName: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Object })
  location: { lat: number; lng: number };

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
