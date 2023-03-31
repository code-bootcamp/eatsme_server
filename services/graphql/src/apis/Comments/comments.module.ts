import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Alarm } from "../alarm/entities/alarm.entity";
import { Board } from "../boards/entities/board.entity";
import { Reply } from "../replies/entities/reply.entity";
import { User } from "../users/entities/user.entity";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";


@Module({
 imports: [
  TypeOrmModule.forFeature([ 
   Comment,
   Board,
   Reply,
   Alarm,
   User,
  ])
 ],
 providers:[
  CommentsResolver,
  CommentsService,
 ],
})
export class CommentModule {}