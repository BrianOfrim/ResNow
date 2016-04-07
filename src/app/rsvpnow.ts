import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {RsvpFormComponent} from "./rsvp-form.component"
import {RsvpService} from "./rsvp.service"
import {RsvpList} from "./rsvp-list.component"
import {DatepickerDemo} from "./datepicker.component"

@Component({
  selector: 'rsvpnow-app',
  providers: [RsvpService],
  directives: [ROUTER_DIRECTIVES,RsvpFormComponent,RsvpList,DatepickerDemo],
  template: `
  <h2>Hello World</h2>
  <rsvp-form></rsvp-form>
  <datepicker-demo></datepicker-demo>
  <rsvp-list [rsvpItems$] = "rsvpService.rsvpItems$"></rsvp-list>
  `,
  pipes: []
})
@RouteConfig([

])

export class RsvpnowApp {
  constructor(private rsvpService:RsvpService){}
}
