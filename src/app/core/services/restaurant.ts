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
    console.log(uuid);

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
              name: 'burgers',
              iconUrl: 'temp/burgers.svg',
            },
            {
              name: 'poulet',
              iconUrl: 'temp/chicken.svg',
            },
            {
              name: 'boissons',
              iconUrl: 'temp/drinks.svg',
            },
            {
              name: 'frites',
              iconUrl: 'temp/fries.svg',
            },
            {
              name: 'hot dogs',
              iconUrl: 'temp/hot-dogs.svg',
            },
            {
              name: 'glaces',
              iconUrl: 'temp/ice-cream.svg',
            },
            {
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
