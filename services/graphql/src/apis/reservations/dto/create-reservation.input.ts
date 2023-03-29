import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  table: number;

  @Field(() => String)
  time: string;

  @Field(() => String)
  division: string;

  @Field(() => String)
  restaurantId: string;

  @Field(() => Int)
  reservation_time: number;
}
