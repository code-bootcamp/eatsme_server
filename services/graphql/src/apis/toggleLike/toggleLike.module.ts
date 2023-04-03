import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/entities/board.entity';
import { User } from '../users/entities/user.entity';
import { UserModule } from '../users/users.module';
import { UserService } from '../users/users.service';
import { ToggleLike } from './entities/toggleLike.entity';
import { ToggleLikeResolver } from './toggleLike.resolver';
import { ToggleLikeService } from './toggleLike.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      ToggleLike, //
    ]),
  ],
  providers: [
    ToggleLikeResolver,
    ToggleLikeService, //
  ],
  exports: [
    ToggleLikeService, //
  ],
})
export class ToggleLikeModule {}
