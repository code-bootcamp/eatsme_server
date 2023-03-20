import { Field, ObjectType } from '@nestjs/graphql';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  comment: string;

  @OneToMany(() => Reply, (reply) => reply.comments)
  @Field(() => [Reply])
  replies: Reply[];

  @ManyToMany(() => Board, (board) => board.comments)
  @Field(() => [Board])
  boards: Board[];

  @OneToMany(() => Alarm, (alarm) => alarm.comments)
  @Field(() => [Alarm])
  alarms: Alarm[];
}
