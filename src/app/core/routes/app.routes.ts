import { provideRouter, RouterConfig } from '@angular/router';

import {AuthGuard} from '../../authentication/auth.guard';

import {SignIn} from '../../signIn/signIn';
import {ResDisplay} from '../../res-display/res-display';
import {HomePage} from '../../home-page/home-page';
//import {DisplayRoutes} from './display.routes';

export const routes: RouterConfig = [
    {path:'',redirectTo:'/home',pathMatch:'full'},
    {path: 'login', component:SignIn},
    //{path:'events', component: ResDisplay},
    {path:'home', component: HomePage,canActivate: [AuthGuard]},
    {path: 'calendar/:id', component: ResDisplay, canActivate: [AuthGuard]}

]

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AuthGuard
];