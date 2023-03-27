import { Field, Float, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { info } from 'console';

@ObjectType()
export class BoardReturn {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  boardImg: string;

  @Field(() => String)
  startPoint: string;

  @Field(() => String)
  endPoint: string;

  @Field(() => Int)
  like: number;

  @Field(() => [String])
  restaurantIds: string[];

  @Field(() => [RestaurantBoardInfo])
  info: RestaurantBoardInfo[];
}

@ObjectType()
class LocationObject {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}

@ObjectType()
class RestaurantBoardInfo {
  @Field(() => String, { nullable: true })
  _id: string;

  @Field(() => String)
  restaurantName: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  rating: string;

  @Field(() => LocationObject)
  location: LocationObject;
}
