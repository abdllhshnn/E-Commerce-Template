import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngxs/store';

import { routes } from './app.routes';
import { AuthState } from './core/state/auth.state';
import { ProductState } from './core/state/product.state';
import { OrderState } from './core/state/order.state';
import { AddressState } from './core/state/address.state';
import { ProfileState } from './core/state/profile.state';
import { InitAuth } from './core/state/actions/auth.actions';

function initAuthFactory(store: Store) {
  return () => store.dispatch(new InitAuth());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore([AuthState, ProductState, OrderState, AddressState, ProfileState]),
    {
      provide: APP_INITIALIZER,
      useFactory: initAuthFactory,
      deps: [Store],
      multi: true,
    },
  ]
};
