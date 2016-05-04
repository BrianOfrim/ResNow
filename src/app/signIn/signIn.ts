
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {AngularFire,FirebaseAuth} from 'angularfire2';
import {Authentication} from '../authentication/authentication';
 
@Component({
  selector: 'sign-in',
  template: `
  <div>
    <span *ngIf="af.auth | async">
      Logged in as {{ (af.auth | async).github.username }}
      <button (click) = "af.auth.logout() "> Log out</button>
    </span>
    <span *ngIf="!(af.auth | async)">
      <button (click)= "startlogin()"> Log in </button>
    </span>
  </div>
  `,
  providers:[],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

export class SignIn{
  constructor(public af:AngularFire, private auth: Authentication,private router:Router){}
  
 
  startlogin():void{
    this.auth.signInGithub().then(()=>this.postSignIn());
  }  
  
  private postSignIn() :void{
    this.router.navigate(['RsvpNow'])
  }
  
}
