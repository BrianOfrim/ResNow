import { Injector } from 'angular2/core';
import { Router } from 'angular2/router';
import { Authentication } from './authentication';


let appInjector: Injector;

/**
 * This is a workaround until `CanActivate` supports DI
 * @see https://github.com/angular/angular/issues/4112
 */

export class AuthRouteHelper {
  static dependencies(): {auth: Authentication, router: Router} {
    const injector: Injector = AuthRouteHelper.injector();
    const auth: Authentication = injector.get(Authentication);
    const router: Router = injector.get(Router);
    return {auth, router};
  }

  static injector(injector?: Injector): Injector {
    if (injector) appInjector = injector;
    return appInjector;
  }

  static requireAuth(): boolean {
    const { auth, router } = AuthRouteHelper.dependencies();
    if (!auth.authenticated) router.navigate(['/signIn']);
    return auth.authenticated;
  }

  static requireUnauth(): boolean {
    const { auth, router } = AuthRouteHelper.dependencies();
    if (auth.authenticated) router.navigate(['/events']);
    return !auth.authenticated;
  }
}