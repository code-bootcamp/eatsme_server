import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserReservationRestaurantLocation {
  @Field(() => String)
  lat: string;

  @Field(() => String)
  lng: string;
}

@ObjectType()
export class UserReservationRestaurant {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  restaurantName: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  rating: string;

  @Field(() => UserReservationRestaurantLocation)
  location: UserReservationRestaurantLocation;
}
