import { Injectable, signal } from '@angular/core';
import { RestaurantConfig } from '../types/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantConfigStore {
  config = signal<RestaurantConfig | null>(null);

  setConfig(config: RestaurantConfig) {
    this.config.set(config);
  }

  clear() {
    this.config.set(null);
  }
}
