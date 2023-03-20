import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {

  @Prop({ type: String, required: false })
  section: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Object })
  location: object;

  @Prop({ type: String })
  userRatingsTotal: string;

  @Prop({ type: String })
  phoneNumber: string;

  @Prop({ type: Object })
  openingHours: object;

  @Prop({ type: String })
  rating: string;

}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
