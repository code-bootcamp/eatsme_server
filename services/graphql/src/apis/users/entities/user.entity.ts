import { Field, ObjectType } from '@nestjs/graphql';
import { Alarm } from 'src/apis/alarm/entities/alarm.entity';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Reservation } from 'src/apis/reservations/entities/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  // @Field(() => String)
  password: string;

  @Column({ type: 'varchar', length: 20 })
  @Field(() => String)
  nickname: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Field(() => String)
  userImg: string;

  @OneToMany(() => Reservation, (reservation) => reservation.users)
  @Field(() => [Reservation])
  reservations: Reservation[];

  @OneToMany(() => Board, (board) => board.users)
  @Field(() => [Board])
  boards: Board[];

  @OneToMany(() => Alarm, (alarm) => alarm.users)
  @Field(() => [Alarm])
  alarms: Alarm[];
}
