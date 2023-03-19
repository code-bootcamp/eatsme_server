import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IRestaurantServiceGetDetails,
  IRestaurantServicePostRestaurant,
  IRestaurantServiceSaveNextPage,
} from './interfaces/restaurantService.interface';

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
    //DB에 반복저으로 저장한다.
    await this.saveRepeat(arr);

    //다음페이지의 정보를 저장한다.
    console.log(section);
    this.saveNextPage({ nextPageToken, section });
  }

  saveRepeat(arr) {
    let num = 0;
    arr.forEach(async (el) => {
      const {
        formatted_address,
        geometry,
        place_id,
        name,
        rating,
        user_ratings_total,
      } = el;
      const details = await this.getDetails(place_id);
      num++;
      console.log(
        'num:',
        num,
        name,
        formatted_address,
        geometry.location,
        rating,
        user_ratings_total,
        details,
      );
    });
  }
  async getDetails(place_id: IRestaurantServiceGetDetails): Promise<object> {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const placeConfig = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?&key=${apiKey}&language=ko&place_id=${place_id}&fields=formatted_phone_number,opening_hours`,
    };
    const result = await axios(placeConfig);
    const { formatted_phone_number, opening_hours } = result.data.result;
    return { formatted_phone_number, opening_hours };
  }

  saveNextPage(nextPageToken, section: IRestaurantServiceSaveNextPage) {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const type = 'restaurant';
    const getNextRestaurant = async ({ nextPageToken }) => {
      if (nextPageToken) {
        const nextConfig = {
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=${type}&key=${apiKey}&language=ko&pagetoken=${nextPageToken}&opennow&fields=current_opening_hours`,
        };
        //2초정도의 지연시간이 없으면 같은 정보를 받아오므로 setTimeout으로 지연시켜주었다.
        setTimeout(async () => {
          const result = await axios(nextConfig);
          const arr = result.data.results;
          await this.saveRepeat(arr);
          const nextPageToken = result.data.next_page_token;
          if (nextPageToken) {
            return getNextRestaurant({ nextPageToken });
          }
        }, 2000);
      }
    };
    getNextRestaurant({ nextPageToken });
  }
}
