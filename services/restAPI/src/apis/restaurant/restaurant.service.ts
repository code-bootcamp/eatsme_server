import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import {
  IRestaurantServiceDeleteCollection,
  IRestaurantServiceGetDetails,
  IRestaurantServiceGetDetailsReturn,
  IRestaurantServiceGetRestaurant,
  IRestaurantServicePostAndGetRestaurant,
  IRestaurantServiceSaveNextPage,
} from './interfaces/restaurantService.interface';
import {
  Restaurant,
  RestaurantDocument, //
} from './schemas/restaurant.schemas';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private RestaurantModel: Model<RestaurantDocument>,
  ) {}
  async postRestaurant({
    body,
  }: IRestaurantServicePostAndGetRestaurant): Promise<void> {
    const [section] = Object.values(body);
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=restaurant&key=${apiKey}&language=ko&opennow`,
    };
    //타입을 지정해주면 구조분해 할당으로 받아올수 있지 않을까?
    const result = await axios(config);
    const restaurantsInfos = result.data.results;
    this.saveRepeat({ restaurantsInfos, section });
    const nextPageToken = result.data.next_page_token;
    this.saveNextPage({ nextPageToken, section });
  }

  saveRepeat({
    restaurantsInfos,
    section, //
  }): void {
    restaurantsInfos.forEach(async (el) => {
      const {
        formatted_address: address,
        geometry,
        place_id,
        name: restaurantName,
        rating,
        user_ratings_total: userRatingsTotal,
      } = el;
      const { location } = geometry;
      const details = await this.getDetails(place_id);
      const {
        formatted_phone_number: phoneNumber,
        weekday_text: openingHours,
      } = details;

      if (rating >= 4.5) {
        //이미 있는지 확인하고 없는 경우에만 DB에 저장한다.
        const findRestaurant = await this.RestaurantModel.findOne({
          restaurantName,
        }).exec();
        if (!findRestaurant) {
          const postRestaurant = await new this.RestaurantModel({
            restaurantName,
            address,
            location,
            userRatingsTotal,
            rating,
            phoneNumber,
            openingHours,
            section,
          }).save();
          console.log(postRestaurant);
        }
      }
    });
  }
  async getDetails(
    place_id: IRestaurantServiceGetDetails,
  ): Promise<IRestaurantServiceGetDetailsReturn> {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const placeConfig = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?&key=${apiKey}&language=ko&place_id=${place_id}&fields=formatted_phone_number,opening_hours,photo`,
    };
    const result = await axios(placeConfig);
    const { formatted_phone_number, opening_hours } = result.data.result;
    const { weekday_text } = opening_hours;
    return { formatted_phone_number, weekday_text };
  }

  saveNextPage({
    nextPageToken,
    section,
  }: IRestaurantServiceSaveNextPage): void {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const getNextRestaurant = ({ nextPageToken }) => {
      if (nextPageToken) {
        const nextConfig = {
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${section}&type=restaurant&key=${apiKey}&language=ko&pagetoken=${nextPageToken}&opennow&fields=current_opening_hours`,
        };
        //2초정도의 지연시간이 없으면 같은 정보를 받아오므로 setTimeout으로 지연시켜주었다.
        setTimeout(async () => {
          const result = await axios(nextConfig);
          const restaurantsInfos = result.data.results;
          await this.saveRepeat({ restaurantsInfos, section });
          const nextPageToken = result.data.next_page_token;
          if (nextPageToken) {
            return getNextRestaurant({ nextPageToken });
          }
        }, 2000);
      }
    };
    getNextRestaurant({ nextPageToken });
  }

  async getRestaurants({
    body,
  }: IRestaurantServiceGetRestaurant): Promise<Restaurant[]> {
    const result = await this.RestaurantModel.find({
      section: Object.values(body)[0],
    }).exec();
    if (!result[0]) {
      throw new ForbiddenException(
        '등록되지 않은 행정구역입니다. 등록후 조회해주세요',
      );
    }
    return result;
  }

  deleteCollection({
    body,
  }: IRestaurantServiceDeleteCollection): Promise<string> {
    // try {
    //   const result = await this.RestaurantModel.deleteOne({
    //     _id: Object.values(body)[0],
    //   });
    //   return result.deletedCount
    //     ? '정상적으로 지워졌습니다.'
    //     : '이미 지워진 collection입니다.';
    // } catch (err) {
    //   throw new ForbiddenException(
    //     `현재 _id:${err.messageFormat}이며 정상적인 _id를 입력해주세요`,
    //   );
    // }
    return this.RestaurantModel.deleteOne({
      _id: Object.values(body)[0],
    })
      .then((res) => {
        console.log(res);
        return res.deletedCount
          ? '정상적으로 지워졌습니다.'
          : '이미 지워진 collection입니다.';
      })
      .catch((err) => {
        throw new ForbiddenException(
          `현재 _id:${err.messageFormat}이며 정상적인 _id를 입력해주세요`,
        );
      });
  }
}
