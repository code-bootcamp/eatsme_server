import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';

@ObjectType()
export class BoardReturn {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  boardImg: string;

  @Field(() => String, { nullable: true })
  startPoint: string;

  @Field(() => String, { nullable: true })
  endPoint: string;

  @Field(() => Int, { nullable: true })
  like: number;

  @Field(() => [RestaurantBoardInfo], { nullable: true })
  personalMapData: RestaurantBoardInfo[];

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}

@ObjectType()
class LocationObject {
  @Field(() => Float, { nullable: true })
  lat: number;

  @Field(() => Float, { nullable: true })
  lng: number;
}

@ObjectType()
class RestaurantBoardInfo {
  @Field(() => String, { nullable: true })
  restaurantId: string;

  @Field(() => String, { nullable: true })
  restaurantName: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  imgUrl: string;

  @Field(() => String, { nullable: true })
  recommend: string;

  @Field(() => String, { nullable: true })
  rating: string;

  @Field(() => LocationObject, { nullable: true })
  location: LocationObject;
}
