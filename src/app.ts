// import { ComponentRef, enableProdMode, provide } from 'angular2/core';
// import { bootstrap } from 'angular2/platform/browser';
// import { ROUTER_PROVIDERS } from 'angular2/router';
import { ComponentRef, enableProdMode, ReflectiveInjector } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig,AuthMethods,AuthProviders} from 'angularfire2';
import {Authentication} from './app/authentication/authentication';

import {Landing} from './app/landing/landing';
import {APP_ROUTER_PROVIDERS} from './app/core/routes/app.routes';

import {ReservationService} from './app/core/reservation2/reservation2.service';  
import {CalendarService} from './app/core/calendar.service/calendar.service';  
// import {UserService} from './app/core/user.service/user.service'; 

// enableProdMode(); 

bootstrap(Landing, [
    FIREBASE_PROVIDERS,
    defaultFirebase({
    apiKey: "AIzaSyD8mleIHBMJBZ58cBhHHFNKTA1Y8rrUgzA",
    authDomain: "resnow-718ab.firebaseapp.com",
    databaseURL: "https://resnow-718ab.firebaseio.com",
    storageBucket: "resnow-718ab.appspot.com",
  }),
    Authentication,
    firebaseAuthConfig({
      method: AuthMethods.Popup,
      provider: AuthProviders.Google
    }),
    APP_ROUTER_PROVIDERS,
    ReservationService,
    CalendarService,
    // UserService,
    ROUTER_PROVIDERS,
    provideForms()
]);
