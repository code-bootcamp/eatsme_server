import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
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

  @ManyToOne(() => User, (user) => user.alarms)
  @Field(() => User)
  users: User;

  // @ManyToOne(() => Comment, (comment) => comment.alarms)
  // @Field(() => Comment)
  // comments: Comment;
}
