import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IRestaurantServicePostRestaurant } from './interfaces/restaurantService.interface';

@Injectable()
export class RestaurantService {
  async postRestaurant({
    section,
  }: IRestaurantServicePostRestaurant): Promise<void> {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;

    const type = 'restaurant';

    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=${type}&key=${apiKey}&language=ko&opennow&fields=current_opening_hours`,
    };
    const result = await axios(config);
    const nextPageToken = result.data.next_page_token;
    const arr = result.data.results;
    arr.forEach(async (el) => {
      const {
        formatted_address,
        geometry,
        place_id,
        name,
        rating,
        user_ratings_total,
      } = el;
      const placeConfig = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?&key=${apiKey}&language=ko&place_id=${place_id}&fields=formatted_phone_number,opening_hours`,
      };
      const result2 = await axios(placeConfig);
      const { formatted_phone_number, opening_hours } = result2.data.result;
      console.log(
        formatted_phone_number,
        opening_hours,
        formatted_address,
        geometry,
        place_id,
        name,
        rating,
        user_ratings_total,
      );
    });
  }
}
