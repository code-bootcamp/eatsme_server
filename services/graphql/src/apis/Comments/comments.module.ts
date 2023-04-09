import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmModule } from '../alarm/alarms.module';
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
    AlarmModule,
    TypeOrmModule.forFeature([
      Comment, //
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
