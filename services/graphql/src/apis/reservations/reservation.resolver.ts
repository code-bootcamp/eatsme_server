import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservation.service';

@Resolver()
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reservation)
  createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput, //
    @Context() context: IContext,
  ): Promise<Reservation> {
    const userId = context.req.user.id;
    return this.reservationsService.createReservation({
      createReservationInput,
      userId,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  async deleteReservation(
    @Args('restaurant_id') restaurant_id: string, //
    @Context()
    context: IContext, //
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return this.reservationsService.deleteReservation({
      userId,
      restaurant_id,
    });
  }
}
