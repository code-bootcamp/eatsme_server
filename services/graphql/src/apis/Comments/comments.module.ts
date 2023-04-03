import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alarm } from '../alarm/entities/alarm.entity';
import { BoardModule } from '../boards/boards.module';
import { UserModule } from '../users/users.module';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    BoardModule,
    UserModule,
    TypeOrmModule.forFeature([
      Comment,
      Alarm, //
    ]),
  ],
  providers: [
    CommentsResolver,
    CommentsService, //
  ],
  exports: [
    CommentsService, //
  ],
})
export class CommentModule {}
