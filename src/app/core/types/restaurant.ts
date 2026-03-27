import { Style } from './style';

export interface Restaurant {
  name: string;
  uuid: string;
  uri_name: string;
  logo: string;
  favicon: string;
  welcome_image: string;
}

export interface RestaurantConfig {
  restaurant: Restaurant;
  styles: Style[];
}

export interface Category {
  uuid: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface Item {
  uuid: string;
  name: string;
  imageUrl: string;
  categories: string[];
  price: number;
  description: string;
  allergens: string;
  nutritionalValues: string;
}
