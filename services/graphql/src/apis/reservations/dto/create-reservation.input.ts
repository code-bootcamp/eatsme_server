import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  table: number;

  @Field(() => Date)
  time: Date;
}
