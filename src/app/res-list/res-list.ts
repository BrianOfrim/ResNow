import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { FirebaseListObservable } from 'angularfire2';
import { Reservation2, IReservation2} from '../core/reservation2/reservation2';
import { ResItem } from '../res-item/res-item';


@Component({
  selector: 'res-list',
  templateUrl: 'app/res-list/res-list.html',
  styleUrls: ['app/res-list/res-list.css'],
  providers: [],
  directives: [ResItem],
  pipes: []
})
export class ResList {
  @Input() resItems$: FirebaseListObservable<IReservation2[]>;
  @Output() remove: EventEmitter<IReservation2> = new EventEmitter(false);
  constructor() {}

}
