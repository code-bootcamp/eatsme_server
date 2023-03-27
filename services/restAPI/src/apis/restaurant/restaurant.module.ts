import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalMapsService } from '../personalMaps/personlMaps.Service';
import { RemainTableMoudle } from '../remaintable/remainTable.module';
import { RemainTablesService } from '../remaintable/remainTable.service';
import { RemainTableSchema } from '../remaintable/schemas/remaintable.schemas';
import { TimeTableModule } from '../timeTable/timeTable.module';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { RestaurantSchema } from './schemas/restaurant.schemas';

@Module({
  imports: [
    TimeTableModule,
    RemainTableMoudle,
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: RestaurantSchema },
      { name: 'RemainTable', schema: RemainTableSchema },
    ]),
  ],
  controllers: [
    RestaurantController, //
  ],
  providers: [
    RestaurantService, //
    PersonalMapsService,
    RemainTablesService,
  ],
  exports: [
    RestaurantService, //
  ],
})
export class RestaurantModule {}
