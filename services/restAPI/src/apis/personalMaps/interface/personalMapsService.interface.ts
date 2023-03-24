import { RestaurantDocument } from 'src/apis/restaurant/schemas/restaurant.schemas';

export interface IPersonalMapsServiceCreatePersonalMap {
  body: {
    course: string;
    startPoint: string;
    endPoint: string;
    info: {
      restaurantName: string;
      recommend: string;
      location: {
        lat: number;
        lng: number;
      };
    }[];
  };
}
export interface IPersonalMapsServiceCreatePersonalMapReturn {
  restaurantInfos: RestaurantDocument[];
}
