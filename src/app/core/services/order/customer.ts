import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Customer} from '../../../shared/types/client';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/env';

export interface RegisterInput {
  restaurantUuid: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private http: HttpClient;
  private apiUrl = environment.apiUrl;

  constructor() {
    this.http = inject(HttpClient);
  }

  register(registerInput: RegisterInput) {
    const {restaurantUuid, name, email} = registerInput;

    return this.http.post<Customer>(
      `${this.apiUrl}/restaurant/${restaurantUuid}/customer`,
      {name, email}
    );
  }

  getByLoyaltyCode(loyaltyCode: string, restaurantUuid: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.apiUrl}/restaurant/${restaurantUuid}/customer?loyaltyCode=${loyaltyCode}`,
    );
  }
}
