import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from 'angular2/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'


@Component({
  selector: 'res-item',
  templateUrl: 'app/res-item/res-item.html',
  styleUrls: ['app/res-item/res-item.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class ResItem {
  @Input() reservation: IReservation2;
  itemDate:Date;
  ngOnInit(){
    this.itemDate = new Date(this.reservation.date);
  }
}
 