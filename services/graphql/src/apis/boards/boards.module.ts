import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../Comments/entities/comment.entity';

import { ImagesService } from '../images/images.service';

import { PersonalMapData } from '../personalMapData/entities/personalMapData.entity';
import { ToggleLike } from '../toggleLike/entities/toggleLike.entity';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/users.service';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Board, //
      Comment,
      User,
      ToggleLike,
      PersonalMapData,
    ]),
  ],
  providers: [
    BoardsResolver, //
    BoardsService,
    UserService,
    ImagesService,
  ],
})
export class BoardModule {}
