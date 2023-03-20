import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardComment } from 'src/apis/boards-comments/boards-comments.entities/boards-comments.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  title: string;

  @CreateDateColumn()
  @Field(() => Date)
  CreateAt: Date;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  boardImg: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  startPoint: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  endPoint: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  customName: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  like: number;

  @ManyToOne(() => User, (user) => user.boards)
  @Field(() => User)
  users: User;

  @OneToMany(() => BoardComment, (boardComment) => boardComment.boards)
  @Field(() => [BoardComment])
  boardComments: BoardComment[];
}
