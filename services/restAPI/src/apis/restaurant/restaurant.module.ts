import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { Restaurant, RestaurantSchema } from './schemas/restaurant.schemas';

@Module({
  imports: [

    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
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
