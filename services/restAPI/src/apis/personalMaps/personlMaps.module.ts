import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemainTableMoudle } from '../remaintable/remainTable.module';
import { RemainTablesService } from '../remaintable/remainTable.service';
import { RemainTableSchema } from '../remaintable/schemas/remaintable.schemas';
import { RestaurantService } from '../restaurant/restaurant.service';
import { RestaurantSchema } from '../restaurant/schemas/restaurant.schemas';
import { TimeTableModule } from '../timeTable/timeTable.module';
import { PersonalMapsController } from './personlMaps.Controller';
import { PersonalMapsService } from './personlMaps.Service';

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
    PersonalMapsController, //
  ],
  providers: [
    PersonalMapsService,
    RestaurantService, //
    RemainTablesService,
  ],
})
export class PersonalMapsModule {}
