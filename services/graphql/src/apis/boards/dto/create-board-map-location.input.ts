import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LocationInput {
  @Field(() => Float)
  lat: number;

  @Field(() => Float)
  lng: number;
}
