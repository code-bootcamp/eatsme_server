import { Body, Controller, Post } from '@nestjs/common';
import {
  IPersonalMapsServiceCreatePersonalMap,
  IPersonalMapsServiceCreatePersonalMapReturn,
} from './interface/personalMapsService.interface';
import { PersonalMapsService } from './personlMaps.Service';

@Controller()
export class PersonalMapsController {
  constructor(
    private readonly personalMapService: PersonalMapsService, //
  ) {}

  @Post('/info/road/map')
  postPersonalMap(
    @Body() body: string, //
  ): Promise<void> {
    return this.personalMapService.createPersonalMap({ body });
  }
}
