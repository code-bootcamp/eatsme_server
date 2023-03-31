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

  @Field(() => String)
  address: string;

  @Field(() => String)
  rating: string;

  @Field(() => UserReservationRestaurantLocation)
  location: UserReservationRestaurantLocation;
}
