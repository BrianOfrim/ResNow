import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';

@Component({
  selector: 'week-day-event-list',
  providers: [],
  directives: [],
  templateUrl: "app/week-day-event-list/week-day-event-list.html",
  styleUrls: ["app/week-day-event-list/week-day-event-list.css"],
  pipes: []
})

export class WeekDayEventList{
    @Input() events: IReservation2[]; 
    @Output() update: EventEmitter<IReservation2> = new EventEmitter(false);
    @Output() remove: EventEmitter<IReservation2> = new EventEmitter(false);


    ngOnInit(){
        // console.log('Events1')
        // console.log(this.events)
        this.events = this.events.sort(this.compare)
        // console.log('Events2')
        // console.log(this.events)
    }

    
    compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    getStartTime(event){
        return new Date(parseInt(event.start));
    }

}