import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  table: number;

  @Column({ type: 'varchar' })
  @Field(() => String)
  time: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  reservation_time: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @Field(() => User)
  users: User;

  @Column({ type: 'varchar' })
  @Field(() => String)
  restaurant_id: string;
}
