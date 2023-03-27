import { Field, InputType } from '@nestjs/graphql';
import { InfoInput } from './create-board-map-info.input';

@InputType()
export class CreateBoardMapInput {
  @Field(() => Array)
  info: InfoInput[];
}
