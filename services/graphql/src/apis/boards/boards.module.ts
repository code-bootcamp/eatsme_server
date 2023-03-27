import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "../Comments/entities/comment.entity";
import { User } from "../users/entities/user.entity";
import { BoardsResolver } from "./boards.resolver";
import { BoardsService } from "./boards.service";
import { Board } from "./entities/board.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ 
      Board, 
      Comment,
      User,
    ])
  ],
  providers: [
    BoardsResolver,
    BoardsService,
  ],
  providers: [BoardsResolver, BoardsService],
})
export class BoardModule {}
