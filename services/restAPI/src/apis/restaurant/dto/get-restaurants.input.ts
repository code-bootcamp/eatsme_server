import { ApiProperty } from '@nestjs/swagger';

export class getRestaurantsInput {
  @ApiProperty()
  area: string;

  @ApiProperty()
  section: string;
}
