import { Field, ObjectType } from '@nestjs/graphql';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { BoardComment } from 'src/apis/boards-comments/boards-comments.entities/boards-comments.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => BoardComment, (boardComment) => boardComment.comments)
  @Field(() => [BoardComment])
  boardComments: BoardComment[];

  @OneToMany(() => Alarm, (alarm) => alarm.comments)
  @Field(() => [Alarm])
  alarms: Alarm[];
}
