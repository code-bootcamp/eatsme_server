import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Board } from './entities/board.entity';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

import { UserModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { ImagesModule } from '../images/images.module';
import { PersonalMapDataModule } from '../personalMapData/personalMapData.module';
import { ToggleLikeModule } from '../toggleLike/toggleLike.module';

@Module({
  imports: [
    UserModule,
    FilesModule,
    ImagesModule,
    ToggleLikeModule,
    PersonalMapDataModule,
    PersonalMapDataModule,
    TypeOrmModule.forFeature([
      Board, //
    ]),
  ],
  providers: [
    BoardsResolver, //
    BoardsService,
  ],
})
export class BoardModule {}
