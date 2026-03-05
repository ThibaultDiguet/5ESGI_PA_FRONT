import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../../shared/types/client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/env';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http: HttpClient;
  private apiUrl = environment.apiUrl;

  constructor() {
    this.http = inject(HttpClient);
  }

  getByLoyaltyCode(loyaltyCode: string, restaurantUuid: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/restaurant/${restaurantUuid}/customer?loyaltyCode=${loyaltyCode}`,
    );
  }
}
