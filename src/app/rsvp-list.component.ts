/**
 * Created by brianofrim on 2016-04-05.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from 'angular2/core';
import { RouterLink, RouteParams } from 'angular2/router';
import { FirebaseListObservable } from 'angularfire2';
import { IReservation } from './core/reservation/reservation';
import { RsvpItem } from './rsvp-item.component'

@Component({
    directives: [RsvpItem],
    selector: 'rsvp-list',
    templateUrl: 'app/rsvp-list.component.html'
})

export class RsvpList {
    @Input() rsvpItems$: FirebaseListObservable<IReservation[]>;

}