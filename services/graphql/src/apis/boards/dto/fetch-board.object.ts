import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { User } from 'src/apis/users/entities/user.entity';

@ObjectType()
export class BoardReturn {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

  @Field(() => String, { nullable: true })
  startArea: string;

  @Field(() => String, { nullable: true })
  endArea: string;

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

  @Field(() => User)
  user: User;
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
  @Field(() => String)
  restaurantId: string;

  @Field(() => String)
  restaurantName: string;

  @Field(() => String)
  area: string;

  @Field(() => String)
  section: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  imgUrl: string | null;

  @Field(() => String, { nullable: true })
  recommend: string | null;

  @Field(() => String, { nullable: true })
  rating: string;

  @Field(() => LocationObject, { nullable: true })
  location: LocationObject;
}
