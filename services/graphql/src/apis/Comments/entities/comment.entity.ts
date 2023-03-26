import { Field, ObjectType } from '@nestjs/graphql';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100}) // varchar는 문자열의 최대길이를 지정
  @Field(() => String)
  comment: string;

  @ManyToOne(() => Board, (board) => board.comments)
  @Field(() => Board)
  board: Board;

  // @OneToMany(() => Alarm, (alarm) => alarm.comments)
  // @Field(() => [Alarm])
  // alarms: Alarm[];
}
