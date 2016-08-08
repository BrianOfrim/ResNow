import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'
//import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'day-res-schedule-item',
  templateUrl: 'app/day-res-schedule-item/day-res-schedule-item.html',
  styleUrls: ['app/day-res-schedule-item/day-res-schedule-item.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class DayResScheduleItem {
  @Input() reservation: IReservation2;
  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);
  startDate:Date;
  // endDate:Date;
  ngOnInit(){
    this.startDate = new Date(this.reservation.start);
  }
  toInt(str){
        return parseInt(str);
    }
  getMinutes(startVal:number){
      let date = new Date(startVal)
      let minutes = date.getMinutes()
      return ("0" + minutes).slice(-2);
  }
}
  