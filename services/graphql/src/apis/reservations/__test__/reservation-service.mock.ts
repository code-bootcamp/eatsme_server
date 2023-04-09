import { UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { Reservation } from '../entities/reservation.entity';
import {
  IReservationDelete,
  IReservationsCreate,
} from '../interfaces/reservations-service.interface';
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
    const user = this.User.findOne({ where: { id: userId } });

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

    const restaurants = await axios.get(
      'http://road-service:7100/info/road/get/restaurant',
      { data: { ...createReservationInput } },
    );

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

  async deleteReservation({
    userId,
    restaurant_id,
  }: IReservationDelete): Promise<boolean> {
    const user = await this.User.findOne({ where: { id: userId } });

    const deleteRestaurant = user.reservations.filter((el) => {
      return el.restaurant_id === restaurant_id;
    });

    if (!deleteRestaurant.length)
      throw new UnprocessableEntityException('예약정보가 없습니다.');

    const result = await axios.delete(
      'http://road-service:7100/info/road/remainTable',
      { data: { ...deleteRestaurant[0] } },
    );

    if (result.data) {
      return (await this.reservations.delete({ restaurant_id })).affected
        ? true
        : false;
    }
  }
}
