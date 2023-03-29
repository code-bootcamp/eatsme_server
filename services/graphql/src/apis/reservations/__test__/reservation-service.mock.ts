import { UnprocessableEntityException } from '@nestjs/common';
import { Reservation } from '../entities/reservation.entity';
import { IReservationsCreate } from '../interfaces/reservations-service.interface';
import {
  MockReservationsRepository,
  MockRestaurantRepository,
  MockUserRepository,
} from './reservation-mock.DB';

export class MockingReservationService {
  User = new MockUserRepository();
  restaurant = new MockRestaurantRepository();
  reservations = new MockReservationsRepository();

  async createReservation({
    createReservationInput, //
    userId,
  }: IReservationsCreate): Promise<Reservation> {
    const { restaurantId, time, table, reservation_time } =
      createReservationInput;
    const user = this.User.findeOne({ where: { id: userId } });

    const isReservation = user.reservations.filter((el) => {
      if (
        el.restaurant_id === restaurantId &&
        el.time === time &&
        el.reservation_time === reservation_time
      )
        return el;
    });

    if (isReservation.length)
      throw new UnprocessableEntityException('이미 예약한 내역이 있습니다.');

    // const restaurants = await axios.get(
    //   'http://road-service:7100/info/road/get/restaurant',
    //   { data: { ...createReservationInput } },
    // );

    const restaurants = this.restaurant.get({ createReservationInput });

    const { _id } = restaurants.data.restaurantInfo;
    return this.reservations.save({
      table,
      time,
      reservation_time,
      restaurant_id: _id,
      users: {
        ...user,
      },
    });
  }
}
