import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column({ type: 'date' })
  @Field(() => Date)
  createdAt: Date;

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

  @JoinTable()
  @ManyToMany(() => Comment, (comment) => comment.boards)
  @Field(() => [Comment])
  comments: Comment[];
}
