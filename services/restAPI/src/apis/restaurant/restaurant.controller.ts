import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/road/restaurant')
  postRestaurants(
    @Body() body: string, //
  ): Promise<void> {
    return this.restaurantService.postRestaurant({ body });
  }

  //!!---------------없는경우 등록하라고 에러 던지기-----------!!//
  @Get('/road/restaurant')
  getRestaurants(
    @Body() body: string, //
  ): Promise<Restaurant[]> {
    return this.restaurantService.getRestaurants({ body });
  }

  @Delete('/road/restaurant')
  deleteRestaurant(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteCollection({ body });
  }
}
