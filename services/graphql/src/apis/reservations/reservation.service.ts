import {
  Delete,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import e from 'express';
import { In, Repository } from 'typeorm';
import { UserService } from '../users/users.service';
import { Reservation } from './entities/reservation.entity';
import {
  IReservationDelete,
  IReservationsCreate,
} from './interfaces/reservations-service.interface';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>, //

    private readonly usersService: UserService,
  ) {}

  async createReservation({
    createReservationInput, //
    userId,
  }: IReservationsCreate): Promise<Reservation> {
    const user = await this.usersService.findOneByUser({ userId });

    const isReservation = user.reservations.filter((el) => {
      if (
        el.restaurant_id === createReservationInput.restaurantId &&
        el.time === createReservationInput.time &&
        el.reservation_time === createReservationInput.reservation_time
      )
        return el;
    });

    if (isReservation.length > 0)
      throw new UnprocessableEntityException('이미 예약한 내역이 있습니다.');

    const restaurants = await axios.get(
      'http://road-service:7100/info/road/get/restaurant',
      { data: { ...createReservationInput } },
    );
    const { table, time, reservation_time } = createReservationInput;
    const { _id } = restaurants.data.restaurantInfo;
    return this.reservationsRepository.save({
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
    const user = await this.usersService.findOneByUser({ userId });
    const deleteRestaurant = user.reservations.filter(
      (el) => el.restaurant_id === restaurant_id,
    );
    if (deleteRestaurant.length === 0)
      throw new UnprocessableEntityException('예약정보가 없습니다.');

    const result = await axios.delete(
      'http://road-service:7100/info/road/remainTable',
      { data: { ...deleteRestaurant[0] } },
    );

    if (result.data) {
      return (await this.reservationsRepository.delete({ restaurant_id }))
        .affected
        ? true
        : false;
    }
    return false;
  }
}
