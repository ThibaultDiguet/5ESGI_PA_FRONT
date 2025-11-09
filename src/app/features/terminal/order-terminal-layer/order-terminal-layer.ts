import {Component, inject} from '@angular/core';
import {LocalStorageService} from '../../../core/services/localStorage';
import {TerminalConfig} from '../../../core/types/terminal';
import {NoConfigFound} from '../no-config-found/no-config-found';
import {JsonPipe} from '@angular/common';
import {ConfigService} from '../../../core/services/config';

@Component({
  selector: 'app-order-layer',
  imports: [NoConfigFound, JsonPipe],
  templateUrl: './order-terminal-layer.html',
})
export class OrderTerminalLayer {
  localStorageService: LocalStorageService;
  configService: ConfigService;
  protected config: TerminalConfig | null = null;

  constructor() {
    this.localStorageService = inject(LocalStorageService);
    this.configService = inject(ConfigService);
  }

  ngOnInit(): void {
    this.localStorageService.watchItem<TerminalConfig>('terminal-config').subscribe((cachedConfig) => {
      if (cachedConfig) {
        this.config = cachedConfig;
      } else {
        this.config = null;
        this.configService.resetToDefaultConfig();
      }
    });
  }
}
