import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ToggleLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  boardId: string;

  @ManyToOne(() => User, (user) => user.toggleLikes, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
}
