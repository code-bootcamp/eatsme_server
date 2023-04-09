import { Module } from '@nestjs/common';
import { RestaurantModule } from '../restaurant/restaurant.module';

import { TimeTableModule } from '../timeTable/timeTable.module';
import { PersonalMapsController } from './personlMaps.Controller';
import { PersonalMapsService } from './personlMaps.Service';

@Module({
  imports: [
    TimeTableModule,
    RestaurantModule, //
  ],
  controllers: [
    PersonalMapsController, //
  ],
  providers: [
    PersonalMapsService, //
  ],
  exports: [
    PersonalMapsService, //
  ],
})
export class PersonalMapsModule {}
