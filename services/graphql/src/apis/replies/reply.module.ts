import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "../boards/entities/board.entity";
import { Comment } from "../Comments/entities/comment.entity";
import { Reply } from "./entities/reply.entity";
import { ReplysResolver } from "./reply.resolver";
import { ReplysService } from "./reply.service";



@Module({
 imports: [
  TypeOrmModule.forFeature([
   Reply,
   Comment,
  ])
 ],
 providers: [
  ReplysResolver,
  ReplysService,
 ]
})
export class ReplysModule{}