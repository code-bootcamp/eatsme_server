import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { PersonalMapData } from 'src/apis/personalMapData/entities/personalMapData.entity';
import { ToggleLike } from 'src/apis/toggleLike/entities/toggleLike.entity';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      from: (value?: Date) => value,
      to: () => new Date(new Date().getTime() + 9 * 60 * 60 * 1000),
    },
  })
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  startArea: string;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  endArea: string;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  startPoint: string;

  @Column({ type: 'varchar', length: 10 })
  @Field(() => String)
  endPoint: string;

  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.board, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];

  @OneToMany(
    () => PersonalMapData,
    (personalMapData) => personalMapData.board,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => [PersonalMapData])
  personalMapData: PersonalMapData[];

  @OneToMany(() => ToggleLike, (toggleLike) => toggleLike.board)
  toggleLike: ToggleLike[];
}
