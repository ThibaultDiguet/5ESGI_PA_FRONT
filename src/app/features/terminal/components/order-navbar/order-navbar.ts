import { Component, inject } from '@angular/core';
import { CustomIcon } from '../../../../shared/components/icons/custom-icon';
import { HlmButtonImports } from '../../../../shared/components/ui/ui-button-helm/src';
import { HorizontalScroll } from '../../../../shared/components/primitives/horizontal-scroll/horizontal-scroll';
import { TerminalConfigStore } from '../../../../core/stores/terminalConfigStore';

@Component({
  selector: 'app-order-navbar',
  templateUrl: './order-navbar.html',
  imports: [CustomIcon, HlmButtonImports, HorizontalScroll],
})
export class OrderNavbar {
  public terminalConfigStore: TerminalConfigStore;

  constructor() {
    this.terminalConfigStore = inject(TerminalConfigStore);
  }
}
