import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environment/env';
import {ServiceMode} from '../../types/terminal';
import {inject, Injectable} from '@angular/core';

export interface CreateOrderDto {
  customerUuid?: string;
  serviceMode: ServiceMode;
  easelCode: string | null;
  items: { uuid: string; quantity: number }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  sendOrder(restaurantUuid: string, orderData: CreateOrderDto): Observable<{ orderNumber: string }> {
    return this.http.post<{ orderNumber: string }>(
      `${this.apiUrl}/restaurant/${restaurantUuid}/order`,
      orderData
    );
  }
}
