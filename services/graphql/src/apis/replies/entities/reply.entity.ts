import { Field, ObjectType } from '@nestjs/graphql';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  reply: string;

  @ManyToOne(() => Comment, (comments) => comments.replies, { onDelete: 'CASCADE' })
  @Field(() => Comment)
  comments: Comment;

  @OneToMany(() => Alarm, (alarm) => alarm.replies, { onDelete: 'CASCADE' })
  @Field(() => [Alarm])
  alarms: Alarm[];

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
