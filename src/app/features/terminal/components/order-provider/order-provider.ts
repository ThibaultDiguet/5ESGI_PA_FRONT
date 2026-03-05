import { Component, inject } from '@angular/core';
import { OrderMenuLayout } from '../order-menu-layout/order-menu-layout';
import { Steps, TerminalSteps } from '../../../../core/services/order/terminalSteps';
import { OrderWelcome } from '../order-welcome/order-welcome';
import { OrderServiceMode } from '../order-service-mode/order-service-mode';
import { OrderAuthentification } from '../order-authentification/order-authentification';
import { OrderCheckout } from '../order-checkout/order-checkout';
import { OrderConfirmation } from '../order-confirmation/order-confirmation';
import { OrderAuthentificationScan } from '../order-authentification-scan/order-authentification-scan';
import { OrderAuthentificationCode } from '../order-authentification-code/order-authentification-code';

@Component({
  selector: 'app-order-provider',
  templateUrl: './order-provider.html',
  imports: [
    OrderMenuLayout,
    OrderWelcome,
    OrderServiceMode,
    OrderAuthentification,
    OrderCheckout,
    OrderConfirmation,
    OrderAuthentificationScan,
    OrderAuthentificationCode,
  ],
})
export class OrderProvider {
  public stepService: TerminalSteps;
  protected readonly Steps = Steps;

  constructor() {
    this.stepService = inject(TerminalSteps);
  }
}
