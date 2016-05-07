
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {AngularFire,FirebaseAuth} from 'angularfire2';
import {Authentication} from '../authentication/authentication';
 
@Component({
  selector: 'sign-in',
  templateUrl:'app/signIn/signIn.html',
  styleUrls: ['app/signIn/signIn.css'],
  providers:[],
  directives: [ROUTER_DIRECTIVES],
  pipes: []
})

export class SignIn{
  constructor(public af:AngularFire, private auth: Authentication,private router:Router){}
  
 
  startGithubLogin():void{
    this.auth.signInGithub().then(()=>this.postSignIn());
  }  
  startGoogleLogin():void{
    this.auth.signInGoogle().then(()=>this.postSignIn());
  } 
  startFacebookLogin():void{
    this.auth.signInFacebook().then(()=>this.postSignIn());
  } 
  startTwitterLogin():void{
    this.auth.signInTwitter().then(()=>this.postSignIn());
  } 
  signOut():void{
    this.auth.signOut();
  }
  goToEvents():void{
    this.router.navigate(['RsvpNow'])
  }
  
  private postSignIn() :void{
    this.router.navigate(['RsvpNow'])
  }
  
}
