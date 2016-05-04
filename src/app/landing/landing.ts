import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from 'angular2/router';
import { RsvpnowApp } from '../rsvpnow';
import {SignIn} from '../signIn/signIn';
import {AngularFire,FirebaseAuth} from 'angularfire2';

@RouteConfig([
  {path: '/', name: 'SignIn', component: SignIn,useAsDefault: true},
  {path: '/rsvp-now', name: 'RsvpNow', component: RsvpnowApp}
])


@Component({
  selector: 'landing',
  template: `
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
     <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Res Now!</a>
    <p class = "navbar-text" *ngIf = "af.auth | async">Signed in as {{ (af.auth | async).github.username }}</p>
      <button *ngIf = "af.auth | async" type="button" class="btn btn-default navbar-btn navbar-right" (click) = "signOut()">Sign out</button>
  </div>
</nav>
<div class="jumbotron">
    <div class="container">
        <h1>Welcome to reserve now</h1>
        <p>Your reservation awaits...</p>
    </div>
</div>

  <div class="container-fluid">
  
 <router-outlet></router-outlet>
  `,
  styleUrls: ['app/landing/landing.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Landing {

  constructor(public af:AngularFire,private router: Router) {}
  
   signOut(): void {
     this.af.auth.logout();
     this.router.navigate(['SignIn']);
     console.log("Hit signout")
   }
}
