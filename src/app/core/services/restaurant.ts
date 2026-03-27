import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment/env';
import {HttpClient} from '@angular/common/http';
import {Category, Item} from '../types/restaurant';
import {Observable} from 'rxjs';

export interface MenuResponse {
  categories: Category[];
  items: Item[];
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = environment.apiUrl;
  private http: HttpClient;

  constructor() {
    this.http = inject(HttpClient);
  }

  getByUri(uri: string) {
    return this.http.get(`${this.apiUrl}/restaurant/${uri}/config`);
  }

  getMenuByUuid(uuid: string): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(`${this.apiUrl}/restaurant/${uuid}/products`);
  }
}
