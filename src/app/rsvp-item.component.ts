/**
 * Created by brianofrim on 2016-04-05.
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from 'angular2/core';
import {IReservation} from './core/reservation/reservation';


@Component({
    selector: 'rsvp-item',
    templateUrl: 'app/rsvp-item.component.html'

})

export class RsvpItem {
    @Input() rsvp: IReservation;
}