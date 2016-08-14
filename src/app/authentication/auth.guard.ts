import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Authentication} from './authentication';
import {FirebaseAuthState } from 'angularfire2';
@Injectable()
export class AuthGuard implements CanActivate {
  authState: FirebaseAuthState;
  constructor(private authService: Authentication, private router: Router) {
    this.authService.userAuth.subscribe(authentic =>{
      console.log(authentic)
      this.authState = authentic;
    })
  }
  canActivate() {
    console.log(this.authState);
    //console.log(this.authService.userAuth.getAuth());
    if (this.authState != null){
        console.log("canActivate")
        return true; 
    }
    this.router.navigate(['/login']);
    return false;
  }
}