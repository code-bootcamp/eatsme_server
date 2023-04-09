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
