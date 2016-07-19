import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {Authentication} from './authentication';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: Authentication, private router: Router) {}
  canActivate() {
    if (this.authService.authenticated){
        console.log("canActivate")
        return true; 
    }
    this.router.navigate(['/login']);
    return false;
  }
}