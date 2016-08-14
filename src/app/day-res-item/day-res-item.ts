import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'
import {Authentication} from '../authentication/authentication';

@Component({
  selector: 'day-res-item',
  templateUrl: 'app/day-res-item/day-res-item.html',
  styleUrls: ['app/day-res-item/day-res-item.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class DayResItem {
  @Input() reservation: IReservation2;
  @Output() remove: EventEmitter<any> = new EventEmitter(false);
  @Output() update: EventEmitter<any> = new EventEmitter(false);

  startDate:Date;
  canEdit: boolean;
  // endDate:Date;
  constructor(public auth: Authentication){}
  ngOnInit(){
    this.startDate = new Date(this.reservation.start);
    if(this.reservation.ownerUID ==this.auth.authState.uid){
      this.canEdit = true;
    }else{
      this.canEdit = false;
    }
  }

  emitUpdate(){
    console.log('Event update sent');
  }
}
  