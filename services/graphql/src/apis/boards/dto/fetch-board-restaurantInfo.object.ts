import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RestaurantBoardInfo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  restaurantName: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String)
  rating: string;
}
