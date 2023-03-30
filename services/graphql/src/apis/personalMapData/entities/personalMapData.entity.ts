import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PersonalMapData {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  restaurantId: string;

  @Column()
  @Field(() => String)
  recommend: string;

  @Column()
  @Field(() => String)
  imgUrl: string;

  @ManyToOne(() => Board, (board) => board.personalMapData)
  @Field(() => Board)
  board: Board;
}
