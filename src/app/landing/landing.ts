import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import { RsvpnowApp } from '../rsvpnow';
import {SignIn} from '../signIn/signIn';

@RouteConfig([
  {path: '/sign-in', name: 'SignIn', component: SignIn,useAsDefault: true},
  {path: '/rsvp-now', name: 'RsvpNow', component: RsvpnowApp}
])


@Component({
  selector: 'landing',
  template: `
  <h1>Hello World</h1>
      <nav>
      <a [routerLink]="['SignIn']">Sign In</a>
      <a [routerLink]="['RsvpNow']">Events</a>
    </nav>
 <router-outlet></router-outlet>
  `,
    //     <app-header
    //   [authenticated]="auth.authenticated"
    //   (signOut)="signOut()"></app-header>
    
    // <main class="main">
    //   <router-outlet></router-outlet>
    // </main>
  styleUrls: ['app/landing/landing.css'],
  providers: [ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Landing {

  constructor() {}
  // signOut(): void {
  //   this.auth.signOut();
  //   window.location.replace('/');
  // }
}
