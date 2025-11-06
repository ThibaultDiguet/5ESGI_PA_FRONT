import {Component, inject} from '@angular/core';
import {LocalStorageService} from '../../../core/services/localStorage';
import {TerminalConfig} from '../../../core/types/terminal';
import {NoConfigFound} from '../no-config-found/no-config-found';
import {JsonPipe} from '@angular/common';
import {StyleService} from '../../../core/services/style';

@Component({
  selector: 'app-order-layer',
  imports: [NoConfigFound, JsonPipe],
  templateUrl: './order-terminal-layer.html',
})
export class OrderTerminalLayer {
  localStorageService: LocalStorageService = inject(LocalStorageService);
  styleService: StyleService = inject(StyleService);
  protected config: TerminalConfig | null = null;

  ngOnInit(): void {
    this.localStorageService.watchItem<TerminalConfig>('terminal-config').subscribe((cachedConfig) => {
      if (cachedConfig) {
        this.config = cachedConfig;
      } else {
        this.config = null;
        this.styleService.resetAll();
      }
    });
  }
}
