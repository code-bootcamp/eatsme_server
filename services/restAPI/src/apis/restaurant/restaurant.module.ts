import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemainTableModule } from '../remaintable/remainTable.module';
import { TimeTableModule } from '../timeTable/timeTable.module';
import { PersonalMapsModule } from '../personalMaps/personlMaps.module';

import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantSchema } from './schemas/restaurant.schemas';

@Module({
  imports: [
    TimeTableModule,
    RemainTableModule,
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
