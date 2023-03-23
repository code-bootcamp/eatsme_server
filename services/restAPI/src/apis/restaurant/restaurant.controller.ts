import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseFilters,
} from '@nestjs/common';
// import { MongooseExceptionFilter } from 'src/commons/filter/mongoose-exception.filter';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/info/road/restaurant')
  postRestaurants(
    @Body() body: string, //
  ): Promise<void> {
    return this.restaurantService.postRestaurants({ body });
  }

  //!!---------------없는경우 등록하라고 에러 던지기-----------!!//
  @Get('/info/road/restaurant')
  getRestaurants(
    @Body() body: string, //
  ): Promise<Restaurant[]> {
    return this.restaurantService.getRestaurants({ body });
  }

  //!!---------------잘못된 양식인 경우 에러 던지기-----------!!//
  @Delete('/info/road/restaurant')
  deleteRestaurant(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteCollection({ body });
  }
}
