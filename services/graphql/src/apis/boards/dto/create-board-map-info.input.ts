import { Field, InputType } from '@nestjs/graphql';
import { LocationInput } from './create-board-map-location.input';

@InputType()
export class InfoInput {
  @Field(() => String)
  restaurantName: string;

  @Field(() => String)
  recommend: string;

  @Field(() => LocationInput)
  location: LocationInput;
}
