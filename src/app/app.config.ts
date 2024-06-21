import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { cartReducers } from './store/cart/reducers';
import { cartEffects } from './store/cart/effects';
import {authInterceptor} from './interceptors/auth.interceptor'
import {
  withComponentInputBinding,
  withNavigationErrorHandler,
} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideFileRouter(
      withComponentInputBinding(),
      withNavigationErrorHandler(console.error)
    ),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    provideClientHydration(),
    provideAnimations(),
    provideStore({ cart: cartReducers }),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    [provideEffects(cartEffects)],
  ],
};
