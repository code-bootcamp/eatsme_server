import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ToggleLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Board, (board) => board.toggleLike)
  @JoinColumn()
  @Field(() => Board)
  board: Board;

  @ManyToOne(() => User, (user) => user.toggleLikes)
  @JoinColumn()
  @Field(() => User)
  user: User;
}
