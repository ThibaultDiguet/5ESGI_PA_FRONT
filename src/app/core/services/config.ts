import {inject, Injectable} from '@angular/core';
import {StyleService} from './style';
import {RestaurantConfig} from '../types/restaurant';
import {TerminalConfig} from '../types/terminal';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private styleService: StyleService;

  constructor() {
    this.styleService = inject(StyleService);
  }

  public setFavicon(faviconUrl: string) {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  public setTitle(title: string) {
    document.title = title;
  }

  public applyRestaurantConfig(config: RestaurantConfig) {
    this.styleService.applyStyles(config.styles);
    this.setFavicon(config.restaurant.favicon);
    this.setTitle(config.restaurant.name)
  }

  public applyTerminalConfig(config: TerminalConfig) {
    this.applyRestaurantConfig(config)
  }

  public resetToDefaultConfig() {
    this.styleService.resetAll();
    this.setTitle('Borne appétit');
    this.setFavicon('favicon.ico');
  }
}
