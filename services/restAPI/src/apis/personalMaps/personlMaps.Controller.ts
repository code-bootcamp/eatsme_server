import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
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
    @Req() req: Request, //
  ): Promise<Restaurant[]> {
    return this.personalMapService.createPersonalMap({ req });
  }

  @Get('/info/road/map')
  getPersonalMap(
    @Req() req: Request, //
  ): Promise<IPersonalMapsServiceGetPersonalMapReturn[]> {
    return this.personalMapService.getPersonalMap({ req });
  }
}
