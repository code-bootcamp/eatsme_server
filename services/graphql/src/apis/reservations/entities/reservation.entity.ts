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

  @Column({ type: 'date' })
  @Field(() => Date)
  time: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  @Field(() => User)
  users: User;
}
