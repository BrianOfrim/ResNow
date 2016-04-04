import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {RsvpFormComponent} from "./rsvp-form.component"
import {RsvpService} from "./rsvp.service"

@Component({
  selector: 'rsvpnow-app',
  providers: [RsvpService],
  directives: [ROUTER_DIRECTIVES,RsvpFormComponent],
  template: `
  <h2>Hello World</h2>
  <rsvp-form></rsvp-form>
  `,
  pipes: []
})
@RouteConfig([

])

export class RsvpnowApp {
  constructor(private rsvpService:RsvpService){}
}
