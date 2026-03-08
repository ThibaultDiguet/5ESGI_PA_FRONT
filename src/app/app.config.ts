import {
  ApplicationConfig,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideLottieOptions} from 'ngx-lottie';
import player from 'lottie-web';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player,
    }),
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
};
