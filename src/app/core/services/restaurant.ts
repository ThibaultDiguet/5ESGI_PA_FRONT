import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/env';
import { HttpClient } from '@angular/common/http';
import { Category, Item } from '../types/restaurant';
import { Observable, of, switchMap, throwError, timer } from 'rxjs';

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

  getMenuByUuid(uuid: string, status: string): Observable<MenuResponse> {
    return timer(1000).pipe(
      switchMap(() => {
        if (status === 'error') {
          return throwError(() => ({ status: 500, message: 'Internal Server Error' }));
        }

        if (status === 'empty') {
          return of({ categories: [], items: [] });
        }

        const mockData: MenuResponse = {
          categories: [
            {
              uuid: 'e9a0b1c2-d3e4-4f5a-8b9c-0d1e2f3a4b5c',
              name: 'burgers',
              iconUrl: 'temp/burgers.svg',
            },
            {
              uuid: '6d7e8f9a-0b1c-4d2e-8f9a-0b1c2d3e4f5a',
              name: 'poulet',
              iconUrl: 'temp/chicken.svg',
            },
            {
              uuid: '1a2b3c4d-5e6f-4091-a2b3-c4d5e6f7a8b9',
              name: 'boissons',
              iconUrl: 'temp/drinks.svg',
            },
            {
              uuid: 'c81f3e5a-9d2b-474c-812e-5a6b7c8d9e0f',
              name: 'frites',
              iconUrl: 'temp/fries.svg',
            },
            {
              uuid: '7a4d92c1-3e5b-482a-964f-1d8c2e0b3f4a',
              name: 'hot dogs',
              iconUrl: 'temp/hot-dogs.svg',
            },
            {
              uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              name: 'glaces',
              iconUrl: 'temp/ice-cream.svg',
            },
            {
              uuid: '928e3741-11d6-4e5a-8c43-2f9b109e3a6d',
              name: 'friandises',
              iconUrl: 'temp/woof.svg',
            },
          ],
          items: [
            {
              name: 'Classic Cheeseburger',
              imageUrl: 'assets/images/cheeseburger.jpg',
              categories: ['burgers'],
              price: 9.5,
              description:
                'A delicious beef patty with melted cheddar, pickles, and our secret sauce.',
              allergens: ['Gluten', 'Milk', 'Sesame'],
              nutritionalValues: [],
            },
          ],
        };

        return of(mockData);
      }),
    );
  }
}
