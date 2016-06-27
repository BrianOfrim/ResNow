import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Pipe, PipeTransform } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router-deprecated';
import { FirebaseListObservable } from 'angularfire2';

import { Reservation2, IReservation2} from '../core/reservation2/reservation2';
import { DayResItem } from '../day-res-item/day-res-item';

// @Pipe({ name: 'sortByStart' })
// export class SortByStartPipe implements PipeTransform {
//   transform(evs: any[]) {
//     return evs.sort(function compare(a, b) {
//       if (parseInt(a.start) < parseInt(b.start)) {
//         return -1;
//       }
//       if (parseInt(a.start) > parseInt(b.start)) {
//         return 1;
//       }
//       // a must be equal to b
//       return 0;
//     })}
// }

@Component({
  selector: 'day-res-list',
  templateUrl: 'app/day-res-list/day-res-list.html',
  styleUrls: ['app/day-res-list/day-res-list.css'],
  providers: [],
  directives: [DayResItem],
  pipes: []
})
export class DayResList {
  @Input() resItems$: FirebaseListObservable<IReservation2[]>;
  @Output() toDisplay : EventEmitter<IReservation2> = new EventEmitter(false);
  @Output() remove: EventEmitter<IReservation2> = new EventEmitter(false);

  constructor() {}

emitUpdate(res){
  this.toDisplay.emit(res)
}
}
