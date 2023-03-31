import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from '../images/images.service';

import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { Reservation } from './entities/reservation.entity';
import { ReservationsResolver } from './reservation.resolver';
import { ReservationsService } from './reservation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation, //
      User,
    ]),
  ],
  providers: [
    ReservationsResolver, //
    ReservationsService,
    UserService,

    ImagesService,
  ],
  controllers: [],
})
export class ReservationModule {}

