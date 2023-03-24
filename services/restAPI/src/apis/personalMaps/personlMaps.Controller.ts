import { Body, Controller, Post } from '@nestjs/common';
import { Restaurant } from '../restaurant/schemas/restaurant.schemas';
import { IPersonalMapsServiceCreatePersonalMap } from './interface/personalMapsService.interface';
import { PersonalMapsService } from './personlMaps.Service';

@Controller()
export class PersonalMapsController {
  constructor(
    private readonly personalMapService: PersonalMapsService, //
  ) {}

  @Post('/info/road/map')
  postPersonalMap(
    @Body() body, //
  ): Promise<Restaurant[]> {
    console.log(body);
    return this.personalMapService.createPersonalMap({ body });
  }
}
