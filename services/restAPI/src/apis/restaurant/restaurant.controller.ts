import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/road/restaurant')
  postRestaurant(
    @Body() body: string, //
  ): Promise<void> {
    return this.restaurantService.postRestaurant({ body });
  }

  @Get('/road/restaurant')
  getRestaurant(
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
