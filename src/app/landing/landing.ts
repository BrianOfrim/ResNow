import {Component} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,Router} from '@angular/router-deprecated';
import { ResMain } from '../res-main/res-main';
import {SignIn} from '../signIn/signIn';
import {AngularFire,FirebaseAuth} from 'angularfire2';

@RouteConfig([
  {path: '/', name: 'SignIn', component: SignIn,useAsDefault: true},
  {path: '/rsvp-main', name: 'ResMain', component: ResMain}
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
  constructor(public af:AngularFire,private router: Router) {}
  
   signOut(): void {
     this.af.auth.logout();
     this.router.navigate(['SignIn']);
     console.log("Hit signout")
   }
}
