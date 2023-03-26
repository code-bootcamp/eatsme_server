import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateBoardMapInput {
 @Field(() => String)
 location: {
  lat: number,
  lng: number,
 }

 @Field(() => String)
 restaurantName: string;

 @Field(() => String)
 recommend: string
}