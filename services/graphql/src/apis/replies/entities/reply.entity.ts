import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reply {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  reply: string;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  @Field(() => Comment)
  comments: Comment;
}
