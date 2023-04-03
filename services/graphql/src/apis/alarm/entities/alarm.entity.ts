import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Alarm {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: true })
  @Field(() => Boolean)
  isAlarm: boolean;

  @ManyToOne(() => User, (user) => user.alarms, { onDelete: 'CASCADE' })
  @Field(() => User)
  users: User;

  @ManyToOne(() => Comment, (comment) => comment.alarms, {
    onDelete: 'CASCADE',
  })
  @Field(() => Comment)
  comments: Comment;

  @ManyToOne(() => Reply, (replies) => replies.alarms, { onDelete: 'CASCADE' })
  @Field(() => Reply)
  replies: Reply;

  @Column({ nullable: true })
  @Field(() => String)
  commentUserImg: string;

  @Column()
  @Field(() => String)
  alarmMessage: string;
}
