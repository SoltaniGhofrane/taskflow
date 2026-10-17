import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { routes } from './app.routes';

// Charge les règles françaises (noms des mois, séparateurs des nombres…)
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr' }, // langue utilisée par les pipes
  ],
};