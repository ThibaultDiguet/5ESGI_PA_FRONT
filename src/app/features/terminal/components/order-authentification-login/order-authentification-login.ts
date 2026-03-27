import {Component, inject, input, OnInit, signal} from '@angular/core';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {LoadingState} from '../../../../shared/components/primitives/loading-state/loading-state';
import {CustomerService} from '../../../../core/services/order/customer';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';

@Component({
  selector: 'app-order-authentification-login',
  templateUrl: './order-authentification-login.html',
  imports: [LoadingState, HlmButtonImports],
})
export class OrderAuthentificationLogin implements OnInit {
  loyaltyCode = input.required<string>();

  public terminalOrderStore: TerminalOrderStore;
  public customerService: CustomerService;
  public stepService: TerminalSteps;

  public restaurantConfigStore: RestaurantConfigStore;

  public isLoading = signal<boolean>(true);
  public error = signal<boolean>(false);

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.customerService = inject(CustomerService);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.stepService = inject(TerminalSteps);
  }

  ngOnInit() {
    const restaurantUuid = this.restaurantConfigStore.config()?.restaurant.uuid;

    if (!restaurantUuid) {
      this.error.set(true);
      this.isLoading.set(false);
      return;
    }

    this.customerService.getByLoyaltyCode(this.loyaltyCode(), restaurantUuid).subscribe({
      next: (response) => {
        this.terminalOrderStore.customer.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }

  validateAuthentification() {
    this.terminalOrderStore.setIsLogged(true);
    this.stepService.next();
  }
}
