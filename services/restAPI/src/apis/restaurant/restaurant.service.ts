import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IRestaurantServicePostRestaurant } from './interfaces/restaurantService.interface';

@Injectable()
export class RestaurantService {
  postRestaurant({ section }: IRestaurantServicePostRestaurant): string {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    console.log(apiKey);
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=서울시 ${section} 식당&key=${apiKey}`,
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
    return 'google map api로 받은 식당 정보';
  }
}
