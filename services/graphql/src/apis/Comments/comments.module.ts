import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";

@Module({
 imports: [TypeOrmModule.forFeature([Comment])],
 providers: [],
})
export class CommentModule {}