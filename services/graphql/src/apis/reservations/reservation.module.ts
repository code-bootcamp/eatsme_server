import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';

import { ImagesService } from '../images/images.service';

import { UserModule } from '../users/users.module';

import { Reservation } from './entities/reservation.entity';
import { ReservationsResolver } from './reservation.resolver';
import { ReservationsService } from './reservation.service';

@Module({
  imports: [
    ImagesModule,
    UserModule,
    TypeOrmModule.forFeature([
      Reservation, //
    ]),
  ],
  providers: [
    ReservationsResolver, //
    ReservationsService,
  ],
  exports: [
    ReservationsService, //
  ],
})
export class ReservationModule {}
