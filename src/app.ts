import { ComponentRef, enableProdMode, provide } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { APP_BASE_HREF, ROUTER_PROVIDERS } from 'angular2/router';
import {Landing} from './app/landing/landing';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig,AuthMethods,AuthProviders} from 'angularfire2';

bootstrap(Landing, [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://rsvpnow.firebaseio.com/'),
    firebaseAuthConfig({
      method: AuthMethods.Popup,
      provider: AuthProviders.Github,
      scope: ['email'] 
    }),
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue: '/'})
]);
