import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import {
  IRestaurantServiceGetDetails,
  IRestaurantServicePostRestaurant,
  IRestaurantServiceSaveNextPage,
} from './interfaces/restaurantService.interface';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schemas';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private RestaurantModel: Model<RestaurantDocument>,
  ) {}
  async postRestaurant({
    section,
  }: IRestaurantServicePostRestaurant): Promise<void> {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=restaurant&key=${apiKey}&language=ko&opennow`,
    };

    const result = await axios(config);
    //현재페이지의 정보를 DB에 반복적으로 저장한다.
    const restaurantsInfos = result.data.result;
    await this.saveRepeat(restaurantsInfos);
    // //다음페이지의 정보를 저장한다.
    const nextPageToken = result.data.next_page_token;
    this.saveNextPage({ nextPageToken, section });
  }

  saveRepeat(arr) {
    arr.forEach(async (el) => {
      const {
        formatted_address: address,
        geometry,
        place_id,
        name,
        rating,
        user_ratings_total: userRatingsTotal,
      } = el;
      const { location } = geometry;
      const details = await this.getDetails(place_id);

      //몽공DB에
      const postRestaurant = await new this.RestaurantModel({
        name,
        address,
        location,
        userRatingsTotal,
        rating,
      }).save();
      console.log(postRestaurant);
    });
  }
  async getDetails(place_id: IRestaurantServiceGetDetails): Promise<object> {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const placeConfig = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?&key=${apiKey}&language=ko&place_id=${place_id}&fields=formatted_phone_number,opening_hours`,
    };
    try {
      const result = await axios(placeConfig);
      const { formatted_phone_number, opening_hours } = result.data.result;
      const { weekday_text } = opening_hours;

      return { formatted_phone_number, weekday_text };
    } catch (error) {
      throw new Error(`Error fetching place details: ${error}`);
    }
  }

  saveNextPage({ nextPageToken, section }: IRestaurantServiceSaveNextPage) {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const getNextRestaurant = async ({ nextPageToken }) => {
      if (nextPageToken) {
        const nextConfig = {
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=restaurant&key=${apiKey}&language=ko&pagetoken=${nextPageToken}&opennow&fields=current_opening_hours`,
        };
        //2초정도의 지연시간이 없으면 같은 정보를 받아오므로 setTimeout으로 지연시켜주었다.
        setTimeout(async () => {
          const result = await axios(nextConfig);
          const restaurantsInfos = result.data.results;
          await this.saveRepeat(restaurantsInfos);
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
