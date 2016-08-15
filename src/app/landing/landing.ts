import {Component,ViewContainerRef} from '@angular/core';
// import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from '@angular/router-deprecated';
// import {AngularFire,FirebaseAuth} from 'angularfire2';
// import { ResMain } from '../res-main/res-main';
import {AngularFire} from 'angularfire2';

import { ROUTER_DIRECTIVES,Router } from '@angular/router';
import {SignIn} from '../signIn/signIn';
import {ResDisplay} from '../res-display/res-display';
import {Authentication} from '../authentication/authentication';

// @RouteConfig([
//   {path: '/', name: 'SignIn', component: SignIn,useAsDefault: true},
//   {path: '/events', name: 'Events', component: ResDisplay}
// ])


@Component({
  selector: 'landing',
  templateUrl:'app/landing/landing.html', 
  styleUrls: ['app/landing/landing.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Landing {
  constructor(private router: Router,public viewContainerRef:ViewContainerRef, private auth: Authentication, private af: AngularFire) {
    this.viewContainerRef = viewContainerRef;
  }
  
   signOut(): void {
     this.router.navigate(['/login']);
     this.auth.signOut();
     console.log("Hit signout")
   }

   goHome(): void {
     this.router.navigate(['/home']);
     console.log("Go Home")
   }
}
