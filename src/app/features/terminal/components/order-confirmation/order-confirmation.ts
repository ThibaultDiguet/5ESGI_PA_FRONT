import {Component, inject, OnInit, signal} from '@angular/core';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {LoadingState} from '../../../../shared/components/primitives/loading-state/loading-state';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {CreateOrderDto, OrderService} from '../../../../core/services/order/order';
import {finalize} from 'rxjs';
import {ServiceMode} from '../../../../core/types/terminal';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.html',
  imports: [
    LoadingState,
    HlmButtonImports
  ],
})
export class OrderConfirmation implements OnInit {

  public terminalOrderStore: TerminalOrderStore;
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;
  protected isLoading = signal<boolean>(true);
  protected hasError = signal<boolean>(false);
  private orderService: OrderService;
  private redirectTimeout: any;

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.stepService = inject(TerminalSteps);
    this.orderService = inject(OrderService);
  }

  ngOnDestroy() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  }

  ngOnInit() {
    this.submitOrder();
  }

  private submitOrder() {
    const orderData: CreateOrderDto = {
      customerUuid: this.terminalOrderStore.customer()?.uuid,
      serviceMode: this.terminalOrderStore.serviceMode(),
      easelCode: this.terminalOrderStore.serviceMode() === ServiceMode.DINE_IN
        ? this.terminalOrderStore.easelCode()
        : null,
      items: this.terminalOrderStore.basket().map(line => ({
        uuid: line.product.uuid,
        quantity: line.amount
      })),
      totalPrice: this.terminalOrderStore.totalPrice()
    };

    const restaurantUuid = this.restaurantConfigStore.config()!.restaurant.uuid;

    this.orderService.sendOrder(restaurantUuid, orderData)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.terminalOrderStore.orderNumber.set(response.orderNumber);

          this.redirectTimeout = setTimeout(() => {
            this.stepService.next();
          }, 10000);
        },
        error: (err) => {
          console.error('Erreur lors de l\'envoi de la commande', err);
          this.hasError.set(true);
        }
      });
  }
}
