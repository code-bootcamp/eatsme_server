import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/road/post/restaurant')
  postRestaurant(
    @Body() section: string, //서울의 행정구역을 입력받는다.
  ): string {
    return this.restaurantService.postRestaurant({ section });
  }
}
