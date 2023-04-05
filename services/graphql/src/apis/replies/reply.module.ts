import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmModule } from '../alarm/alarms.module';
import { Alarm } from '../alarm/entities/alarm.entity';
import { Board } from '../boards/entities/board.entity';
import { CommentModule } from '../Comments/comments.module';
import { Comment } from '../Comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { UserModule } from '../users/users.module';
import { Reply } from './entities/reply.entity';
import { ReplysResolver } from './reply.resolver';
import { ReplysService } from './reply.service';

@Module({
  imports: [
    CommentModule,
    UserModule,
    AlarmModule,
    TypeOrmModule.forFeature([Reply]),
  ],
  providers: [
    ReplysResolver,
    ReplysService, //
  ],
})
export class ReplysModule {}
