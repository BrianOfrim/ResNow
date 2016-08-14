import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {CalendarService} from '../core/calendar.service/calendar.service';
import {Authentication} from '../authentication/authentication';

@Component({
  selector: 'week-day-event-schedule',
  providers: [],
  directives: [],
  templateUrl: "app/week-day-event-schedule/week-day-event-schedule.html",
  styleUrls: ["app/week-day-event-schedule/week-day-event-schedule.css"],
  pipes: []
})

export class WeekDayEventSchedule{
    @Input() events: any[]; 
    @Input() startOfDay: number;
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    constructor(public auth: Authentication){}

    hourIntervals: any[];

    ngOnInit(){
        this.hourIntervals = this.createIntervals(this.startOfDay)
        //this.events = this.events.sort(this.compare)
    }

    createIntervals(startOfDay:number){
        let returnArr =[]
        for(let i = 0; i < 24; i++){
            returnArr.push({
                startTime:(startOfDay + i*3600000),
                endTime:(startOfDay + (i+1)*3600000 - 1)
            });
        }
        console.log(returnArr);
        return returnArr
        
    }

    eventBelongsToCurrentUser(event: any): boolean{
        console.log(event.ownerUID)
        console.log(this.auth.authState.uid)
        if(this.auth.authState.uid== '') return false
        if(event.ownerUID == this.auth.authState.uid){
            return true;
        }else{
            return false;
        }
    }

   getHourEvents(hourInterval:any){

        return this.events.filter(event => {
            return event.start >= hourInterval.startTime && event.start <= hourInterval.endTime;
        })
    }



    getMinutes(startVal:number){
        let date = new Date(startVal)
        let minutes = date.getMinutes()
        return ("0" + minutes).slice(-2);
    }
    
    getStartTime(startVal:number){
        return new Date(startVal)
    }

}