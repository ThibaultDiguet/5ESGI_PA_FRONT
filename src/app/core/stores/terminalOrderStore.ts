import { inject, Injectable, signal } from '@angular/core';
import { TerminalSteps } from '../services/order/terminalSteps';
import { Customer } from '../../shared/types/client';
import { ServiceMode } from '../types/terminal';

@Injectable({
  providedIn: 'root',
})
export class TerminalOrderStore {
  serviceMode = signal<ServiceMode>(ServiceMode.DINE_IN);
  customer = signal<Customer | null>(null);

  isLogged = signal<boolean>(false);

  stepService = inject(TerminalSteps);

  setServiceMode(mode: ServiceMode) {
    this.serviceMode.set(mode);
  }

  setCustomer(customer: Customer | null) {
    this.customer.set(customer);
  }

  setIsLogged(isLogged: boolean) {
    this.isLogged.set(isLogged);
  }

  resetOrder() {
    this.customer.set(null);
    this.serviceMode.set(ServiceMode.DINE_IN);
  }
}
