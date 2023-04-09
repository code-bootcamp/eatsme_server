import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalMapData } from './entities/personalMapData.entity';
import { PersonalMapDataService } from './personalMapdata.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalMapData, //
    ]),
  ],
  providers: [
    PersonalMapDataService, //
  ],
  exports: [
    PersonalMapDataService, //
  ],
})
export class PersonalMapDataModule {}
