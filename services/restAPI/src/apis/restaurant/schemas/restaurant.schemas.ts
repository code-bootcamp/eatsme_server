import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @ApiProperty()
  @Prop({ type: String, default: randomUUID })
  _id?: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  area: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  section: string;

  @ApiProperty()
  @Prop({ type: String })
  restaurantName: string;

  @ApiProperty()
  @Prop({ type: String })
  address: string;

  @ApiProperty()
  @Prop({ type: Object })
  location: { lat: number; lng: number };

  @ApiProperty()
  @Prop({ type: String })
  userRatingsTotal: string;

  @ApiProperty()
  @Prop({ type: String })
  phoneNumber: string;

  @ApiProperty()
  @Prop({ type: [String] })
  openingDays: string[];

  @ApiProperty()
  @Prop({ type: String })
  rating: string;
}
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
