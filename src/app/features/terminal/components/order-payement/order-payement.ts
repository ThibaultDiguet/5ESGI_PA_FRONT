import {Component, inject, OnInit, signal} from '@angular/core';
import {PayLottie} from '../../../../shared/components/lotties/pay/pay';
import {HlmButton} from '../../../../shared/components/ui/ui-button-helm/src';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {OrderConfirmation} from '../order-confirmation/order-confirmation';

@Component({
  selector: 'app-order-payement',
  templateUrl: './order-payement.html',
  imports: [
    PayLottie,
    HlmButton,
    OrderConfirmation,
  ]
})
export class OrderPayement implements OnInit {
  public terminalOrderStore: TerminalOrderStore;
  public restaurantConfigStore: RestaurantConfigStore;
  public stepService: TerminalSteps;

  protected isPayementSuccessful = signal<boolean>(false);

  constructor() {
    this.stepService = inject(TerminalSteps);
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
  }

  ngOnInit() {
    setTimeout(() => {

      //simulation paiement réussi
      this.isPayementSuccessful.set(true);
    }, 5000);
  }
}
