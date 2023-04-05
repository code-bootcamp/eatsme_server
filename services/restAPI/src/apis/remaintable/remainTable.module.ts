import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RemainTableController } from './reaminTable.controller';
import { RemainTablesService } from './remainTable.service';
import { RemainTableSchema } from './schemas/remaintable.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RemainTable', schema: RemainTableSchema }, //
    ]),
  ],
  controllers: [
    RemainTableController, //
  ],
  providers: [
    RemainTablesService, //
  ],
  exports: [
    RemainTablesService, //
  ],
})
export class RemainTableModule {}
