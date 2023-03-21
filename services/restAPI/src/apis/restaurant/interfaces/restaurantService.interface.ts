import { Restaurant } from '../schemas/restaurant.schemas';

export interface IRestaurantServicePostAndGetRestaurant {
  body: string;
}
export interface IRestaurantServiceGetRestaurant {
  body: string;
}

export interface IRestaurantServiceGetDetails {
  place_id: string;
}

export interface IRestaurantServiceSaveNextPage {
  nextPageToken: string;
  section: string;
}

export interface IRestaurantServiceGetDetailsReturn {
  formatted_phone_number: string;
  weekday_text: string[];
}
export interface IRestaurantServiceDeleteCollection {
  body: string;
}
