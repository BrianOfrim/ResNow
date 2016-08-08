import { ChangeDetectionStrategy, OnInit,Component, EventEmitter, Input, Output, Pipe, PipeTransform } from '@angular/core';

import { Reservation2, IReservation2} from '../core/reservation2/reservation2';
import { DayResItem } from '../day-res-item/day-res-item';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'day-res-list',
  templateUrl: 'app/day-res-list/day-res-list.html',
  styleUrls: ['app/day-res-list/day-res-list.css'],
  providers: [],
  directives: [DayResItem],
  pipes: []
})
export class DayResList {
  @Input() events: any[]; 
  @Input() startOfDay: number;
  @Output() toDisplay : EventEmitter<any> = new EventEmitter(false);
  @Output() remove: EventEmitter<any> = new EventEmitter(false);


    ngOnInit(){
        // this.events = this.events.sort(this.compare)
        console.log(this.events);
        console.log(this.startOfDay);
    }
  constructor() {}


  emitUpdate(res){
    this.toDisplay.emit(res)
  }
}
