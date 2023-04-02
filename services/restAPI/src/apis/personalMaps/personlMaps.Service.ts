import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import {
  Restaurant,
  RestaurantDocument,
} from '../restaurant/schemas/restaurant.schemas';
import { RestaurantService } from '../restaurant/restaurant.service';
import {
  IPersonalMapsServiceCreatePersonalMap,
  IPersonalMapsServiceGetPersonalMap,
  IPersonalMapsServiceGetPersonalMapReturn,
} from './interface/personalMapsService.interface';
@Injectable()
export class PersonalMapsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,
    private readonly restaurantService: RestaurantService,
  ) {}
  apiKey = process.env.GOOGLE_MAP_API_KEY;

  async createPersonalMap({
    req,
  }: IPersonalMapsServiceCreatePersonalMap): Promise<Restaurant[]> {
    console.log('---식당 정보 등록---');
    const restaurantInfos = await Promise.all(
      req.body.info.map(async (el) => {
        const restaurantInfo = await this.restaurantModel
          .find({
            restaurantName: el.restaurantName,
            location: el.location,
          })
          .exec();
        if (restaurantInfo.length) {
          return await restaurantInfo[0];
        } else {
          const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${el.restaurantName}&key=${this.apiKey}&location=${el.location.lat}%2C${el.location.lng}&radius=100&language=ko`,
          };
          //에러가 날 가능성이 있는 부분1
          const result = await axios(config);
          const newRestaurant = result.data.results.filter((it) => {
            return it.name === el.restaurantName;
          });
          if (newRestaurant) {
            //에러가 날 가능성이 있는 부분2
            const postRestaurant = await new this.restaurantModel({
              ...el,
              openingDays: null,
              phoneNumber: null,
            }).save();
            return postRestaurant;
          } else {
            const {
              geometry,
              place_id,
              name: restaurantName,
              rating,
              user_ratings_total: userRatingsTotal,
            } = newRestaurant[0];
            const address = newRestaurant[0].formatted_address || null;
            const { location } = geometry;
            const { phoneNumber, openingDays } =
              await this.restaurantService.getDetails(place_id);
            //에러가 날 가능성이 있는 부분3
            const postRestaurant = await new this.restaurantModel({
              restaurantName,
              address,
              location,
              userRatingsTotal,
              rating,
              phoneNumber,
              openingDays,
              section: el.section,
              area: el.area,
            }).save();
            return postRestaurant;
          }
        }
      }),
    );
    console.log('---식당 정보 등록 완료---');
    return restaurantInfos;
  }

  async getPersonalMap({
    req,
  }: IPersonalMapsServiceGetPersonalMap): Promise<void> {
    //하나의 배열을 받는 경우? 여러개도 동시에 할 수 있을까?
    //일단은 하나만 받는것으로 하자.
    const ids = JSON.stringify(req.query.data).split(',');
   // const restuarantinfo = await this.restaurantModel.find({
   //   _id: { $in: ids },
   // });
   // console.log(restuarantinfo);
          return { ...result, _id: result.id };
        }),
    );
    console.log('---식당 정보 조회 완료');
    return restaurantInfo;

  }
}
