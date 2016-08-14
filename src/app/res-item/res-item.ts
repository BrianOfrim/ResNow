import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'
import {Authentication} from '../authentication/authentication';

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

  emitUpdate(){
    console.log('Event update sent');
  }
}
  