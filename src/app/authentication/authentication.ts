import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, FirebaseAuth, FirebaseAuthState } from 'angularfire2';



@Injectable()
export class Authentication {
  // private authState: FirebaseAuthData|FirebaseAuthState;
  public userAuth: FirebaseAuth;
  private authState: FirebaseAuthState;
  constructor(public af: AngularFire) {
    // this.authState = auth$.getAuth();
  
    // auth$.subscribe((state: FirebaseAuthState) => {
    //   this.authState = state;
    // });
    // this.af.auth.subscribe((state: FirebaseAuthState) =>{
    //   console.log(state);
    //   this.authState = state;
    // });
    this.af.auth.subscribe(auth => {
      console.log(auth);
      this.authState = auth;

    });
  }
  get authenticated(): boolean {
    return this.authState != null;
  }
  // get expired(): boolean {
  //   // FirebaseAuthState is currently missing `expires` field
  //   // @see https://github.com/angular/angularfire2/issues/112
  //   return !this.authState || (this.authState.expires * 1000) < Date.now();
  // }
  
  get id(): string {
    return this.authenticated ? this.authState.uid: '';
  }
  // get userName():Promise<String>{ 
  //   return this.authState.google.username
  // } 
  
  signInGithub(): Promise<FirebaseAuthState>{
    return this.af.auth.login({
      provider: AuthProviders.Github
    });
  }
  signInFacebook(): Promise<FirebaseAuthState>{
    return this.af.auth.login({
      provider:AuthProviders.Facebook
    });
  }
 signInTwitter(): Promise<FirebaseAuthState>{
    return this.af.auth.login({
      provider:AuthProviders.Twitter
    });
  }
  signInGoogle(): Promise<FirebaseAuthState>{
    return this.af.auth.login({
      provider:AuthProviders.Google
    });
  }
  setUsername():void{
    
  }
  signOut(): void {
    this.af.auth.logout();
  }
}
