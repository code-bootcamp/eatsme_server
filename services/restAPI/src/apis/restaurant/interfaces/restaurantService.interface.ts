export interface IRestaurantServicePostAndGetRestaurant {
  section: string;
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
