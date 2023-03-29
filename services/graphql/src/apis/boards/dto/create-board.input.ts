import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
class LocationInput {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}

@InputType()
class InfoInput {
  @Field(() => String)
  restaurantName: string;

  @Field(() => String)
  recommend: string;

  @Field(() => String)
  imgUrl: string;

  @Field(() => LocationInput)
  location: LocationInput;
}

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  boardImg: string;

  @Field(() => String)
  area: string;

  @Field(() => String)
  startPoint: string;

  @Field(() => String)
  endPoint: string;

  @Field(() => Int)
  like: number;

  @Field(() => Date)
  createdAt?: Date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

  @Field(() => [InfoInput])
  info: InfoInput[];
}
