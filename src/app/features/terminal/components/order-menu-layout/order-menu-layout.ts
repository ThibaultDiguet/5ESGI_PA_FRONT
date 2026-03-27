import {Component, inject, OnInit, signal} from '@angular/core';
import {OrderNavbar} from '../order-navbar/order-navbar';
import {OrderHeader} from '../order-header/order-header';
import {OrderBody} from '../order-body/order-body';
import {RestaurantConfigStore} from '../../../../core/stores/restaurantConfigStore';
import {RestaurantService} from '../../../../core/services/restaurant';
import {LoadingState} from '../../../../shared/components/primitives/loading-state/loading-state';
import {TerminalConfigStore} from '../../../../core/stores/terminalConfigStore';

@Component({
  selector: 'app-order-menu-layout',
  templateUrl: './order-menu-layout.html',
  imports: [OrderNavbar, OrderHeader, OrderBody, LoadingState],
})
export class OrderMenuLayout implements OnInit {
  public isLoading = signal<boolean>(true);
  public error = signal<boolean>(false);
  public restaurantConfigStore: RestaurantConfigStore;
  public restaurantService: RestaurantService;
  public terminalConfigStore: TerminalConfigStore;

  constructor() {
    this.restaurantConfigStore = inject(RestaurantConfigStore);
    this.restaurantService = inject(RestaurantService);
    this.terminalConfigStore = inject(TerminalConfigStore);
  }

  ngOnInit() {
    const restaurantUuid = this.restaurantConfigStore.config()?.restaurant.uuid;

    if (!restaurantUuid) {
      this.error.set(true);
      this.isLoading.set(false);
      return;
    }

    this.restaurantService.getMenuByUuid(restaurantUuid).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        const sortedCategories = [...response.categories].sort((a, b) => a.name.localeCompare(b.name));
        
        this.terminalConfigStore.categories.set(sortedCategories);
        this.terminalConfigStore.selectedCategory.set(sortedCategories[0]);
        this.terminalConfigStore.items.set(response.items);
      },
      error: () => {
        this.error.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
