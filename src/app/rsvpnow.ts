import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {UserEntry} from  "./userEntry/userEntry"
import {ReservationService} from "./core/reservation2/reservation2.service"
import {ResList} from "./res-list/res-list"


@Component({
  selector: 'rsvpnow-app',
  providers: [ReservationService],
  directives: [UserEntry,ResList],
  templateUrl: "app/rsvpnow.html"
,
  pipes: []
})

export class RsvpnowApp {
  constructor(private reservationService: ReservationService){}
}
