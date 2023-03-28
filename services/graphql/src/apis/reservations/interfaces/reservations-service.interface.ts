import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { IContext } from 'src/commons/interfaces/context';
import { CreateReservationInput } from '../dto/create-reservation.input';

export interface IReservationsCreate {
  createReservationInput: CreateReservationInput;
  userId: User['id'];
}

export interface IReservationDelete {
  restaurant_id: string;
  userId: User['id'];
}

// @ObjectType()
// export class ILocationCreate {
//   @Field(() => String)
//   lat: string;

//   @Field(() => String)
//   lng: string;
// }

// @ObjectType()
// export class IRestaurantCreate {
//   @Field(() => String)
//   restaurantName: string;

//   @Field(() => String)
//   address: string;

//   @Field(() => String)
//   rating: string;

//   @Field(() => ILocationCreate)
//   location: ILocationCreate;
// }
