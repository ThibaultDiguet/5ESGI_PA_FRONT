import {Component, inject} from '@angular/core';
import {HlmButtonImports} from '../../../shared/components/ui/ui-button-helm/src';
import {TerminalSteps} from '../../../core/services/order/terminalSteps';
@Component({
  selector: 'app-order-service-mode',
  templateUrl: './order-service-mode.html',
  imports: [HlmButtonImports],
})
export class OrderServiceMode {
  public terminalSteps : TerminalSteps;

  constructor() {
    this.terminalSteps = inject(TerminalSteps)
  }
}
