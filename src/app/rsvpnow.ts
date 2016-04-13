import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {RsvpFormComponent} from "./rsvp-form.component"
import {RsvpService} from "./rsvp.service"
import {RsvpList} from "./rsvp-list.component"
import {DatepickerDemo} from "./datepicker.component"
import {Timepicker } from "./timepicker/timepicker"
import {UserEntry} from  "./userEntry/userEntry"
import {ReservationService} from "./core/reservation2/reservation2.service"
import {ResList} from "./res-list/res-list"


@Component({
  selector: 'rsvpnow-app',
  providers: [RsvpService,ReservationService],
  directives: [ROUTER_DIRECTIVES,RsvpFormComponent,RsvpList,DatepickerDemo,Timepicker,UserEntry,ResList],
  template: `
  <h2>Hello World</h2>
  <!-- <timepicker></timepicker>
  <rsvp-form></rsvp-form>
  <datepicker-demo></datepicker-demo>
  <rsvp-list [rsvpItems$] = "rsvpService.rsvpItems$"></rsvp-list>-->
  <user-entry></user-entry>
  <res-list [resItems$] = "reservationService.reservationItems$"></res-list>
  `,
  pipes: []
})
@RouteConfig([

])

export class RsvpnowApp {
  constructor(private rsvpService:RsvpService,private reservationService: ReservationService){}
}
