import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'
//import {Observable} from 'rxjs/Observable';
import {Authentication} from '../authentication/authentication';

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
  canEdit: boolean;
  constructor(public auth: Authentication){}
  ngOnInit(){
    this.startDate = new Date(this.reservation.start);
    if(this.reservation.ownerUID ==this.auth.authState.uid){
      this.canEdit = true;
    }else{
      this.canEdit = false;
    }
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
  