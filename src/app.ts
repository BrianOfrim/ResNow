// import { ComponentRef, enableProdMode, provide } from 'angular2/core';
// import { bootstrap } from 'angular2/platform/browser';
// import { ROUTER_PROVIDERS } from 'angular2/router';
import { ComponentRef, enableProdMode, ReflectiveInjector } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {Landing} from './app/landing/landing';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig,AuthMethods,AuthProviders} from 'angularfire2';
import {Authentication} from './app/authentication/authentication';
import {MODAL_BROWSER_PROVIDERS} from 'angular2-modal/platform-browser';
bootstrap(Landing, [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://rsvpnow.firebaseio.com/'),
    Authentication,
    MODAL_BROWSER_PROVIDERS,
    firebaseAuthConfig({
      method: AuthMethods.Popup,
      provider: AuthProviders.Github
    }),
    ROUTER_PROVIDERS
]);
