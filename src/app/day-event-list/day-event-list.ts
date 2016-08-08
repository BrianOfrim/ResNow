import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';

import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'day-event-list',
  providers: [],
  directives: [],
  templateUrl: "app/day-event-list/day-event-list.html",
  styleUrls: ["app/day-event-list/day-event-list.css"],
  pipes: []
})

export class DayEventList{
    @Input() events: any[]; 
    @Input() startOfDay: number; 
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);


    ngOnInit(){

    }


    getStartTime(event){
        return new Date(event.start);
    }

}