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
              description:
                'Our custom 100% Angus beef blend, no added hormones ever and free from antibiotics',
            },
            {
              uuid: '6d7e8f9a-0b1c-4d2e-8f9a-0b1c2d3e4f5a',
              name: 'poulet',
              iconUrl: 'temp/chicken.svg',
              description: '100% chicken breast hand breaded and crisp-fried to order',
            },
            {
              uuid: '1a2b3c4d-5e6f-4091-a2b3-c4d5e6f7a8b9',
              name: 'boissons',
              iconUrl: 'temp/drinks.svg',
              description: '',
            },
            {
              uuid: 'c81f3e5a-9d2b-474c-812e-5a6b7c8d9e0f',
              name: 'frites',
              iconUrl: 'temp/fries.svg',
              description: 'Crispy and cut from golden potatoes',
            },
            {
              uuid: '7a4d92c1-3e5b-482a-964f-1d8c2e0b3f4a',
              name: 'hot dogs',
              iconUrl: 'temp/hot-dogs.svg',
              description: '',
            },
            {
              uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              name: 'glaces',
              iconUrl: 'temp/ice-cream.svg',
              description: 'Soft, premium ice cream, made in house daily with only the good stuff',
            },
            {
              uuid: '928e3741-11d6-4e5a-8c43-2f9b109e3a6d',
              name: 'friandises',
              iconUrl: 'temp/woof.svg',
              description: '',
            },
          ],
          items: [
            {
              uuid: '7b2e4f1a-8c5d-4b92-bd1a-f8234e9d6c1a',
              name: 'ShackBurger®',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:dc2f2814-6970-422a-b300-3e2c17aed51b',
              allergens:
                'This product may contain Gluten, Egg, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 610\nFat (g): 42\nSaturated Fat (g): 19\nTrans Fats (g): 1.5\nCholesterol (mg): 110\nSodium (Na) (g): 600\nCarbohydrate (g): 27\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 0\nProtein (g): 33',
              price: 7,
              categories: ['burgers'],
              description: 'Cheeseburger with lettuce, tomato, ShackSauce',
            },
            {
              uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:dc2f2814-6970-422a-b300-3e2c17aed51b',
              name: 'Double ShackBurger®',
              allergens:
                'This product may contain Gluten, Egg, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 930\nFat (g): 64\nSaturated Fat (g): 30\nTrans Fats (g): 2\nCholesterol (mg): 220\nSodium (Na) (g): 1010\nCarbohydrate (g): 27\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 0\nProtein (g): 65',
              price: 10,
              categories: ['burgers'],
              description: 'Double cheeseburger with lettuce, tomato, ShackSauce',
            },
            {
              uuid: '928e3741-11d6-4e5a-8c43-2f9b109e3a6d',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:7ff382cf-3c6a-42a1-b727-0ecf10d1f5ab',
              name: 'SmokeShack™',
              allergens:
                'This product may contain Gluten, Egg, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 660\nFat (g): 43\nSaturated Fat (g): 19\nTrans Fats (g): 1.5\nCholesterol (mg): 125\nSodium (Na) (g): 990\nCarbohydrate (g): 30\nFibre (g): 2\nSugars (g): 5\nAdded Sugars (g): 0\nProtein (g): 41',
              price: 9,
              categories: ['burgers'],
              description: 'Cheeseburger with cherry peppers, veal bacon, ShackSauce',
            },
            {
              uuid: 'b50284c9-6f1a-4d2a-874e-9b3c1d0f5e72',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:7ff382cf-3c6a-42a1-b727-0ecf10d1f5ab',
              name: 'Double SmokeShack™',
              allergens:
                'This product may contain Gluten, Egg, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 980\nFat (g): 65\nSaturated Fat (g): 30\nTrans Fats (g): 2\nCholesterol (mg): 220\nSodium (Na) (g): 1410\nCarbohydrate (g): 31\nFibre (g): 2\nSugars (g): 5\nAdded Sugars (g): 0\nProtein (g): 70',
              price: 12,
              categories: ['burgers'],
              description: 'Double cheeseburger with  cherry peppers, veal bacon, ShackSauce',
            },
            {
              uuid: '7a4d92c1-3e5b-482a-964f-1d8c2e0b3f4a',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:2ab31e66-50a4-4145-ad56-f81ad4e62fbf',
              name: 'Shroom Burger',
              allergens:
                'This product may contain Glueten, Egg, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 490\nFat (g): 27\nSaturated Fat (g): 3\nTrans Fats (g): 0\nCholesterol (mg): 5\nSodium (Na) (g): 750\nCarbohydrate (g): 42\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 0\nProtein (g): 22',
              price: 7,
              categories: ['burgers'],
              description:
                'Crisp-fried portobello mushroom filled with melted cheese, topped with lettuce, tomato, ShackSauce',
            },
            {
              uuid: 'c81f3e5a-9d2b-474c-812e-5a6b7c8d9e0f',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3b40cc8a-8317-4f2e-b130-f5c73e526caa',
              name: 'Shack Stack™',
              allergens:
                'This product may contain Glutem Eggs, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 890\nFat (g): 59\nSaturated Fat (g): 21\nTrans Fats (g): 1.5\nCholesterol (mg): 125\nSodium (Na) (g): 1240\nCarbohydrate (g): 42\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 0\nProtein (g): 51',
              price: 10,
              categories: ['burgers'],
              description:
                'Cheeseburger topped with a ‘Shroom Burger with lettuce, tomato, ShackSauce',
            },
            {
              uuid: '1a2b3c4d-5e6f-4091-a2b3-c4d5e6f7a8b9',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:3b40cc8a-8317-4f2e-b130-f5c73e526caa',
              name: 'Double Shack Stack',
              allergens:
                'This product may contain Glutem Eggs, Soybeans, Milk, Sulphite, Celery, Mustard, Sesame',
              nutritionalValues:
                'Calories: 1180\nFat (g): 77\nSaturated Fat (g): 28\nTrans Fats (g): 2\nCholesterol (mg): 215\nSodium (Na) (g): 1660\nCarbohydrate (g): 43\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 0\nProtein (g): 80',
              price: 12.5,
              categories: ['burgers'],
              description:
                'Double cheeseburger topped with a ‘Shroom Burger with lettuce, tomato, ShackSauce',
            },
            {
              uuid: '6d7e8f9a-0b1c-4d2e-8f9a-0b1c2d3e4f5a',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:5504b686-a731-42b6-a494-48a7565abdc5',
              name: 'Cheeseburger',
              allergens: 'This product may contain Gluten, Milk, Sesame seeds, Sulphur dioxide',
              nutritionalValues:
                'Calories: 520\nFat (g): 28\nSaturated Fat (g): 15\nTrans Fats (g): 1\nCholesterol (mg): 105\nSodium (Na) (g): 510\nCarbohydrate (g): 27\nFibre (g): 2\nSugars (g): 2\nAdded Sugars (g): 6\nProtein (g): 39',
              price: 7,
              categories: ['burgers'],
              description: 'Griddled patty with cheese and your choice of toppings',
            },
            {
              uuid: 'e9a0b1c2-d3e4-4f5a-8b9c-0d1e2f3a4b5c',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:14bce06d-f90f-4a3a-9372-27c1112aaeef',
              name: 'Double Cheeseburger',
              allergens: 'This product may contain Gluten, Milk, Sesame seeds, Sulphur dioxide',
              nutritionalValues:
                'Calories: 860\nFat (g): 52\nSaturated Fat (g): 27\nTrans Fats (g): 2\nCholesterol (mg): 185\nSodium (Na) (g): 850\nCarbohydrate (g): 28\nFibre (g): 2\nSugars (g): 6\nAdded Sugars (g): 6\nProtein (g): 70',
              price: 10,
              categories: ['burgers'],
              description: 'Double griddled patty with cheese and your choice of toppings',
            },
            {
              uuid: '2b3c4d5e-6f7a-48b9-a0b1-c2d3e4f5a6b7',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:84617280-b18a-47f1-a8e9-a0d73fabbfa5',
              name: 'Hamburger',
              allergens: 'This product may contain Gluten, Milk, Sesame',
              nutritionalValues:
                'Calories: 540\nFat (g): 35\nSaturated Fat (g): 19\nTrans Fats (g): 1.5\nCholesterol (mg): 110\nSodium (Na) (g): 180\nCarbohydrate (g): 24\nFibre (g): 2\nSugars (g): 5\nAdded Sugars (g): 0\nProtein (g): 33',
              price: 6.5,
              categories: ['burgers'],
              description: 'Griddled patty and your choice of toppings',
            },
            {
              uuid: '8f9a0b1c-2d3e-44f5-a6b7-c8d9e0f1a2b3',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:84617280-b18a-47f1-a8e9-a0d73fabbfa5',
              name: 'Double Hamburger',
              allergens: 'This product may contain Gluten, Milk, Sesame',
              nutritionalValues:
                'Calories: 790\nFat (g): 54\nSaturated Fat (g): 27\nTrans Fats (g): 2.5\nCholesterol (mg): 175\nSodium (Na) (g): 250\nCarbohydrate (g): 24\nFibre (g): 2\nSugars (g): 5\nAdded Sugars (g): 0\nProtein (g): 55',
              price: 9,
              categories: ['burgers'],
              description: 'Double griddled patty and your choice of toppings',
            },
            {
              uuid: '4c5d6e7f-8a9b-40c1-d2e3-f4a5b6c7d8e9',
              imageUrl:
                'https://delivery-p129961-e1274544.adobeaemcloud.com/adobe/assets/urn:aaid:aem:bd5cf1c6-49b3-4fee-b0d4-a792cf336526',
              name: 'Grilled Cheese',
              allergens: 'This product may contain Gluten, Soybean, Milk, Sesame',
              nutritionalValues:
                'Calories: 290\nFat (g): 14\nSaturated Fat (g): 8\nTrans Fats (g): 0\nCholesterol (mg): 0\nSodium (Na) (g): 780\nCarbohydrate (g): 28\nFibre (g): 2\nSugars (g): 5\nAdded Sugars (g): 0\nProtein (g): 13',
              price: 4.5,
              categories: ['burgers'],
              description: 'American cheese melted in a grilled potato bun',
            },
          ],
        };

        return of(mockData);
      }),
    );
  }
}
