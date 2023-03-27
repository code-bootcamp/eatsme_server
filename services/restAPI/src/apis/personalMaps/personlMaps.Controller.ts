import { Body, Controller, Get, Post } from '@nestjs/common';
import { Restaurant } from '../restaurant/schemas/restaurant.schemas';
import { IPersonalMapsServiceGetPersonalMapReturn } from './interface/personalMapsService.interface';
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
    return this.personalMapService.createPersonalMap({ body });
  }

  @Get('/info/road/map')
  getPersonalMap(
    @Body() body, //
  ): Promise<IPersonalMapsServiceGetPersonalMapReturn[]> {
    return this.personalMapService.getPersonalMap({ body });
  }
}
