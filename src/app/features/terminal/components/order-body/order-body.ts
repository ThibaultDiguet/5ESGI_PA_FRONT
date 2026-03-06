import { Component, inject } from '@angular/core';
import { TerminalConfigStore } from '../../../../core/stores/terminalConfigStore';

@Component({
  selector: 'app-order-body',
  templateUrl: './order-body.html',
})
export class OrderBody {
  public terminalConfigStore: TerminalConfigStore;

  constructor() {
    this.terminalConfigStore = inject(TerminalConfigStore);
  }
}
