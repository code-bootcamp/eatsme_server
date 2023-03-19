export interface IRestaurantServicePostRestaurant {
  section: string;
}
export interface IRestaurantServiceGetDetails {
  place_id: string;
}

export interface IRestaurantServiceSaveNextPage {
  nextPageToken: string;
  section: string;
}
