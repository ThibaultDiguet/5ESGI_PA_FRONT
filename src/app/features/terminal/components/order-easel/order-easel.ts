import {Component, inject, signal} from '@angular/core';
import {TerminalOrderStore} from '../../../../core/stores/terminalOrderStore';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';
import {TerminalSteps} from '../../../../core/services/order/terminalSteps';
import {NumericKeyboardCode} from '../code-keyboard/numeric-keyboard-code';

@Component({
  selector: 'app-order-easel',
  templateUrl: './order-easel.html',
  imports: [HlmButtonImports, NumericKeyboardCode],
})
export class OrderEasel {

  public terminalOrderStore: TerminalOrderStore;
  public stepService: TerminalSteps;
  public restaurantConfigStore: RestaurantConfigStore;

  private easelValue = signal<string>('');

  constructor() {
    this.terminalOrderStore = inject(TerminalOrderStore);
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.stepService = inject(TerminalSteps);
  }

  protected onCodeChange(code: string) {
    this.easelValue.set(code);
  }

  protected saveCode() {
    if (this.easelValue().length > 0) {
      this.terminalOrderStore.easelCode.set(this.easelValue());
      this.stepService.next();
    }
  }
}
