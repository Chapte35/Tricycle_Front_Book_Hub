import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation  } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { tokenExpiryInterceptor } from './interceptors/token-expiry.interceptor';
import { provideMarkdown } from 'ngx-markdown';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes, withHashLocation()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, tokenExpiryInterceptor]))
    provideMarkdown()
  ]
};
