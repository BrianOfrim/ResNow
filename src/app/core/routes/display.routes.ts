import { RouterConfig }          from '@angular/router';
import { ResDisplay }     from '../../res-display/res-display';

export const DisplayRoutes: RouterConfig = [
  //{ path: 'heroes',  component: HeroListComponent },
  { path: 'calendar/:id', component: ResDisplay }
];