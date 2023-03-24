import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { CommentsResolver } from "./comments.resolvor";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";


@Module({
 imports: [
  TypeOrmModule.forFeature([
   Comment,
  ])
 ],
 providers:[
  CommentsResolver,
  CommentsService,
 ],
})
export class CommentModule {}