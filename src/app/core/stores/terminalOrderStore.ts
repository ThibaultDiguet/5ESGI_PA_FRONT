import {computed, inject, Injectable, signal} from '@angular/core';
import {TerminalSteps} from '../services/order/terminalSteps';
import {Customer} from '../../shared/types/client';
import {ServiceMode} from '../types/terminal';
import {Item} from '../types/restaurant';

export interface OrderLine {
  product: Item;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TerminalOrderStore {
  serviceMode = signal<ServiceMode>(ServiceMode.DINE_IN);
  customer = signal<Customer | null>(null);

  isLogged = signal<boolean>(false);
  basket = signal<OrderLine[]>([]);

  stepService = inject(TerminalSteps);

  readonly totalPrice = computed(() =>
    this.basket().reduce((total, line) => total + (line.product.price * line.amount), 0)
  );

  readonly totalItems = computed(() =>
    this.basket().reduce((total, line) => total + line.amount, 0)
  );

  setServiceMode(mode: ServiceMode) {
    this.serviceMode.set(mode);
  }

  setCustomer(customer: Customer | null) {
    this.customer.set(customer);
  }

  setIsLogged(isLogged: boolean) {
    this.isLogged.set(isLogged);
  }

  addToBasket(product: Item, amount: number = 1) {
    this.basket.update(currentBasket => {
      const index = currentBasket.findIndex(line => line.product.uuid === product.uuid);

      if (index !== -1) {
        const newBasket = [...currentBasket];
        newBasket[index] = {
          ...newBasket[index],
          amount: newBasket[index].amount + amount
        };
        return newBasket;
      }

      return [...currentBasket, {product, amount}];
    });
  }

  decreaseQuantity(product: Item) {
    this.basket.update(currentBasket => {
      const index = currentBasket.findIndex(line => line.product.uuid === product.uuid);

      if (index === -1) return currentBasket;

      const newBasket = [...currentBasket];
      const newAmount = newBasket[index].amount - 1;

      if (newAmount <= 0) {
        return newBasket.filter(line => line.product.uuid !== product.uuid);
      }

      newBasket[index] = {...newBasket[index], amount: newAmount};
      return newBasket;
    });
  }

  removeFromBasket(product: Item) {
    this.basket.update(basket => basket.filter(line => line.product.uuid !== product.uuid));
  }

  resetOrder() {
    this.customer.set(null);
    this.serviceMode.set(ServiceMode.DINE_IN);
    this.basket.set([]);
  }
}
