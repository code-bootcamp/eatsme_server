import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../boards/boards.module';
import { UserModule } from '../users/users.module';
import { ToggleLike } from './entities/toggleLike.entity';
import { ToggleLikeResolver } from './toggleLike.resolver';
import { ToggleLikeService } from './toggleLike.service';

@Module({
  imports: [
    forwardRef(() => BoardModule),
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
