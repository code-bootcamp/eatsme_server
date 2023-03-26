import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { IReservationCreate } from './interfaces/reservation-service.interface';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsReposoitory: Repository<Reservation>,
  ) {}

  async createReservation({
    createReservationInput,
  }: IReservationCreate): Promise<Reservation> {
    return;
  }
}
