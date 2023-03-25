import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantSchema } from './schemas/restaurant.schemas';

@Module({
  imports: [
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
  exports: [
    RestaurantService, //
  ],
})
export class RestaurantModule {}
