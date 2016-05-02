
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AngularFire,FirebaseAuth} from 'angularfire2';
 
@Component({
  selector: 'sign-in',
  template: `
  <div>
    <span *ngIf="af.auth | async">
      Logged in as {{ (af.auth | async).github.username }}
      <button (click) = "af.auth.logout() "> Log out</button>
    </span>
    <span *ngIf="!(af.auth | async)">
      <button (click)= "af.auth.login()"> Log in </button>
    </span>
  </div>
  `,
  providers:[],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

export class SignIn{
  constructor(public af:AngularFire,private _auth: FirebaseAuth){}
  startlogin():void{
   this._auth.login(); 
  }  
  
  
}
