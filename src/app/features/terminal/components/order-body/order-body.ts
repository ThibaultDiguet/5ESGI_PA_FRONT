import {Component, computed, effect, inject, signal} from '@angular/core';
import {TerminalConfigStore} from '../../../../core/stores/terminalConfigStore';
import {HlmButtonImports} from '../../../../shared/components/ui/ui-button-helm/src';

import {NG_ICON_DIRECTIVES, provideIcons} from '@ng-icons/core';
import {HlmIconImports} from '../../../../shared/components/ui/ui-icon-helm/src';
import {lucideChevronLeft, lucideChevronRight} from '@ng-icons/lucide';
import {CurrencyPipe} from '@angular/common';
import {Item} from '../../../../core/types/restaurant';
import {HlmSheetImports} from '../../../../shared/components/ui/ui-sheet-helm/src';
import {OrderItemDetail} from '../order-item-detail/order-item-detail';
import {BrnSheetContent} from '@spartan-ng/brain/sheet';

@Component({
  selector: 'app-order-body',
  templateUrl: './order-body.html',
  imports: [HlmButtonImports, HlmIconImports, NG_ICON_DIRECTIVES, CurrencyPipe, HlmSheetImports, OrderItemDetail, BrnSheetContent],
  providers: [provideIcons({lucideChevronRight, lucideChevronLeft})],
})
export class OrderBody {
  public terminalConfigStore: TerminalConfigStore;

  public actualPage = signal<number>(1);

  paginatedItems = computed(() => {
    const start = (this.actualPage() - 1) * 6;
    const end = start + 6;
    return this.terminalConfigStore.filteredItems().slice(start, end);
  });
  selectedItem = signal<Item | null>(null);
  isSheetOpened = signal(false);

  constructor() {
    this.terminalConfigStore = inject(TerminalConfigStore);

    effect(() => {
      this.terminalConfigStore.selectedCategory();
      this.actualPage.set(1);
    });
  }

  public nextPage() {
    const totalItems = this.terminalConfigStore.filteredItems().length;
    const totalPages = Math.ceil(totalItems / 6);
    if (this.actualPage() < totalPages) {
      this.actualPage.update((page) => page + 1);
    } else {
      this.actualPage.set(1);
    }
  }

  public prevPage() {
    const totalItems = this.terminalConfigStore.filteredItems().length;
    const totalPages = Math.ceil(totalItems / 6);
    if (this.actualPage() > 1) {
      this.actualPage.update((page) => page - 1);
    } else {
      this.actualPage.set(totalPages);
    }
  }

  openDetail(item: Item) {
    this.selectedItem.set(item);
    this.isSheetOpened.set(true);
  }
}
