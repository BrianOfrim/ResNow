import {Component,ViewContainerRef} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from '@angular/router-deprecated';
import {AngularFire,FirebaseAuth} from 'angularfire2';
// import { ResMain } from '../res-main/res-main';

import {SignIn} from '../signIn/signIn';
import {ResDisplay} from '../res-display/res-display';

@RouteConfig([
  {path: '/', name: 'SignIn', component: SignIn,useAsDefault: true},
  {path: '/events', name: 'Events', component: ResDisplay}
])


@Component({
  selector: 'landing',
  templateUrl:'app/landing/landing.html', 
  styleUrls: ['app/landing/landing.css'],
  providers: [],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})
export class Landing {
  constructor(public af:AngularFire,private router: Router,public viewContainerRef:ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
  
   signOut(): void {
     this.af.auth.logout();
     this.router.navigate(['SignIn']);
     console.log("Hit signout")
   }
}
