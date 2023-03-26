import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';

import { RestaurantDocument } from '../restaurant/schemas/restaurant.schemas';
@Injectable()
export class PersonalMapsService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}
  apiKey = process.env.GOOGLE_MAP_API_KEY;
  async createPersonalMap({ body }): Promise<void> {
    const restaurantInfos = Promise.all(
      body.info.map(async (el) => {
        //같은 장소이지만 좌표가 조금 다를수 도 있지 않을까? 다른 API에서 보내주는 정보이니 재고해보자.
        //식당이름으로 검색한다.
        const restaurantInfo = await this.restaurantModel
          .find({
            restaurantName: el.restaurantName,
            //   location: el.location,
          })
          .exec();
        if (restaurantInfo.length) {
          return await restaurantInfo;
        } else {
          //google Place api에 요청한다.
          //요청시 좌표로 요청을 해야 하나?
          const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${el.restaurantName}&key=${this.apiKey}&language=ko&type=restaurant`,
          };
          const result = await axios(config);
          console.log(result.data);
          //   console.log(restaurantInfo);
        }
      }),
    );
    // console.log(await restaurantInfos);
  }
}
