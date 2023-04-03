import { Field, ObjectType } from '@nestjs/graphql';
import { userInfo } from 'os';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 }) // varchar는 문자열의 최대길이를 지정
  @Field(() => String)
  comment: string;

  @ManyToOne(() => Board, (board) => board.comments, { onDelete: 'CASCADE' })
  @Field(() => Board)
  board: Board;

  @OneToMany(() => Reply, (replies) => replies.comments, {
    onDelete: 'CASCADE',
  }) //{ onDelete: 'CASCADE' }는 부모엔티티에서 작업하는게 자식엔티티에도 영향을 주는것을 의미함(예시: 수정 삭제)
  @Field(() => [Reply])
  replies: Reply[];

  @OneToMany(() => Alarm, (alarm) => alarm.comments, { onDelete: 'CASCADE' })
  @Field(() => [Alarm])
  alarms: Alarm[];

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;
}
