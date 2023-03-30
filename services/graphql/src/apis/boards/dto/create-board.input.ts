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
  area: string;

  @Field(() => String)
  section: string;

  @Field(() => String)
  restaurantName: string;

  @Field(() => String, { nullable: true })
  recommend: string;

  @Field(() => String, { nullable: true })
  imgUrl: string;

  @Field(() => LocationInput)
  location: LocationInput;
}

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  startArea: string;

  @Field(() => String)
  endArea: string;

  @Field(() => String)
  startPoint: string;

  @Field(() => String)
  endPoint: string;
  @Field(() => String, { nullable: true })
  boardImg: string;

  @Field(() => Int, { nullable: true })
  like: number;

  @Field(() => Date)
  createdAt?: Date = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

  @Field(() => [InfoInput])
  info: InfoInput[];
}
