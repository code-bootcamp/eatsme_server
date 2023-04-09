import { Field, ObjectType } from '@nestjs/graphql';
import { Reservation } from 'src/apis/reservations/entities/reservation.entity';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Board } from 'src/apis/boards/entities/board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserReservationRestaurant } from '../interfaces/user-reservationRestaurant.inferface';
import { ToggleLike } from 'src/apis/toggleLike/entities/toggleLike.entity';
import { Comment } from 'src/apis/Comments/entities/comment.entity';
import { Reply } from 'src/apis/replies/entities/reply.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 30 })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String, { nullable: true })
  userImg: string;

  @Field(() => [UserReservationRestaurant], { nullable: true })
  restaurant: UserReservationRestaurant[];

  @OneToMany(() => Reservation, (reservation) => reservation.users)
  @Field(() => [Reservation])
  reservations: Reservation[];

  @OneToMany(() => Board, (boards) => boards.user)
  @Field(() => [Board])
  boards: Board[];

  @OneToMany(() => Alarm, (alarm) => alarm.users)
  @Field(() => [Alarm])
  alarms: Alarm[];

  @OneToMany(() => Comment, (comments) => comments.user, {
    onDelete: 'CASCADE',
  })
  comments: Comment;

  @OneToMany(() => Reply, (replies) => replies.user, { onDelete: 'CASCADE' })
  replies: Reply;

  @OneToMany(() => ToggleLike, (toggleLikes) => toggleLikes.user)
  @Field(() => [ToggleLike])
  toggleLikes: ToggleLike[];
}
