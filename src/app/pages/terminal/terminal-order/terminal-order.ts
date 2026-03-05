import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/localStorage';
import { ConfigService } from '../../../core/services/config';
import { TerminalConfig } from '../../../core/types/terminal';
import { NoConfigFound } from '../../../features/terminal/components/no-config-found/no-config-found';
import { OrderProvider } from '../../../features/terminal/components/order-provider/order-provider';
import { RestaurantConfig } from '../../../core/types/restaurant';
import { RestaurantConfigStore } from '../../../core/stores/restaurantConfigStore';

@Component({
  selector: 'app-terminal-order',
  imports: [NoConfigFound, OrderProvider],
  templateUrl: './terminal-order.html',
})
export class TerminalOrder implements OnInit {
  localStorageService: LocalStorageService;
  configService: ConfigService;
  restaurantConfig: RestaurantConfigStore;

  constructor() {
    this.localStorageService = inject(LocalStorageService);
    this.configService = inject(ConfigService);
    this.restaurantConfig = inject(RestaurantConfigStore);
  }

  ngOnInit(): void {
    this.localStorageService
      .watchItem<TerminalConfig>('terminal-config')
      .subscribe((cachedConfig) => {
        if (cachedConfig) {
          this.restaurantConfig.setConfig(cachedConfig as RestaurantConfig);
          this.configService.applyRestaurantConfig(cachedConfig);
        } else {
          this.restaurantConfig.clear();
          this.configService.resetToDefaultConfig();
        }
      });
  }
}
