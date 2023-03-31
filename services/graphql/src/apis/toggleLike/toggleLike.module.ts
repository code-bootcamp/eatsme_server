import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { ToggleLike } from './entities/toggleLike.entity';
import { ToggleLikeResolver } from './toggleLike.resolver';
import { ToggleLikeService } from './toggleLike.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ToggleLike, //
      Board,
    ]),
  ],
  providers: [
    ToggleLikeResolver,
    ToggleLikeService, //
  ],
})
export class ToggleLikeModule {}
