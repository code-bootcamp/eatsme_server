import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';

@Resolver()
export class ReservationResolver {
  constructor(
    private readonly reservationsService: ReservationService, //
  ) {}

  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return this.reservationsService.createReservation({
      createReservationInput,
    });
  }
}
