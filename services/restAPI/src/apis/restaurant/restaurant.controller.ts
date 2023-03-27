import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './schemas/restaurant.schemas';

@Controller()
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService, //
  ) {}

  //등록한 식당의 갯수를 반환해보자.
  @Post('/info/road/restaurant')
  postRestaurants(
    @Body() body: string, //
  ): Promise<void> {
    return this.restaurantService.postRestaurants({ body });
  }

  @Get('/info/road/restaurant')
  getRestaurants(
    @Body() body: string, //
  ): Promise<Restaurant[]> {
    return this.restaurantService.getRestaurants({ body });
  }

  @Get('/info/road/get/restaurant')
  getRestaurant(
    @Req() req: Request, //
  ): Promise<object> {
    return this.restaurantService.getRestaurant({ req });
  }

  @Get('/info/road/findOne/restaurant')
  findeOneRestaurant(
    @Req() req: Request, //
  ): Promise<Restaurant> {
    return this.restaurantService.findOneRestaurant({
      restaurant_id: req.body,
    });
  }

  @Get('/info/road/find/restaurant')
  UsergetRestaurants(
    @Req() req: Request, //
  ): Promise<Restaurant[]> {
    return this.restaurantService.UsergetRestaurants({ req });
  }

  @Delete('/info/road/restaurant')
  deleteRestaurant(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteCollection({ body });
  }

  @Delete('/info/road/restaurants')
  deleteRestaurants(
    @Body() body: string, //
  ): Promise<string> {
    return this.restaurantService.deleteSection({ body });
  }
}
