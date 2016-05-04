import {Injectable} from 'angular2/core';
import { AuthProviders, FirebaseAuth, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class Authentication {
  private authState: FirebaseAuthState;
  constructor(public auth$: FirebaseAuth) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }
  get authenticated(): boolean {
    return this.authState !== null && !this.expired;
  }
  get expired(): boolean {
    // FirebaseAuthState is currently missing `expires` field
    // @see https://github.com/angular/angularfire2/issues/112
    return !this.authState || (this.authState.expires * 1000) < Date.now();
  }
  
  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signInGithub(): Promise<FirebaseAuthState>{
    return this.auth$.login({
      provider: AuthProviders.Github
    });
  }
  signOut(): void {
    this.auth$.logout();
  }
}
