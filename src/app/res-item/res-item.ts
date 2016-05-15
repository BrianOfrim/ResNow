import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
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
  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  startDate:Date;
  endDate:Date;
  ngOnInit(){
    this.startDate = new Date(this.reservation.startDate);
    this.endDate =  new Date(this.reservation.endDate);
  }
}
 