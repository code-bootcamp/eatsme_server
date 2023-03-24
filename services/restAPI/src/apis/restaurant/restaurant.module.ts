import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalMapsModule } from '../personalMaps/personlMaps.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantSchema } from './schemas/restaurant.schemas';

@Module({
  imports: [
    PersonalMapsModule,
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },
    ]),
  ],
  controllers: [
    RestaurantController, //
  ],
  providers: [
    RestaurantService, //
  ],
})
export class RestaurantModule {}
