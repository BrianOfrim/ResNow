import {bootstrap} from 'angular2/platform/browser';
import {RsvpnowApp} from './app/rsvpnow';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

bootstrap(RsvpnowApp, [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://rsvpnow.firebaseio.com/'),
    ROUTER_PROVIDERS
]);
