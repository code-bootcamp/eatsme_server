import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoardComment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Board, (board) => board.boardComments)
  @Field(() => Board)
  boards: Board;

  @ManyToOne(() => Comment, (comment) => comment.boardComments)
  @Field(() => Comment)
  comments: Comment;
