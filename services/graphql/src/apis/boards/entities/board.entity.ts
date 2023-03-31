import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { PersonalMapData } from 'src/apis/personalMapData/entities/personalMapData.entity';

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
  @Field(() => Date, { nullable: true })
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

  @Column({ default: 0 })
  @Field(() => Int)
  like: number;

  @ManyToOne(() => User, (user) => user.boards, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comments) => comments.board, {
    onDelete: 'CASCADE',
  }) //{ onDelete: 'CASCADE' }는 부모엔티티에서 작업하는게 자식엔티티에도 영향을 주는것을 의미함(예시: 수정 삭제)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(
    () => PersonalMapData,
    (personalMapData) => personalMapData.board,
    {
      onDelete: 'CASCADE',
    },
  )
  @Field(() => PersonalMapData)
  personalMapData: PersonalMapData;
}
