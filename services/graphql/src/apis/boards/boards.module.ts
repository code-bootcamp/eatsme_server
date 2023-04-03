import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';

import { FilesService } from '../files/files.service';

import { ImagesService } from '../images/images.service';

import { PersonalMapData } from '../personalMapData/entities/personalMapData.entity';
import { PersonalMapDataModule } from '../personalMapData/personalMapData.module';
import { ToggleLike } from '../toggleLike/entities/toggleLike.entity';
import { ToggleLikeModule } from '../toggleLike/toggleLike.module';
import { ToggleLikeService } from '../toggleLike/toggleLike.service';
import { UserModule } from '../users/users.module';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    ToggleLikeModule,
    PersonalMapDataModule,
    PersonalMapDataModule,
    UserModule,
    FilesModule,
    TypeOrmModule.forFeature([
      Board, //
    ]),
  ],
  providers: [
    BoardsResolver, //
    BoardsService,
    ImagesService,
  ],
})
export class BoardModule {}
