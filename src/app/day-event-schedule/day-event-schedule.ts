import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'day-event-schedule',
  providers: [],
  directives: [],
  templateUrl: "app/day-event-schedule/day-event-schedule.html",
  styleUrls: ["app/day-event-schedule/day-event-schedule.css"],
  pipes: []
})

export class DayEventSchedule{
    @Input() events: Observable<any>; 
    @Input() startOfDay: string;
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    hourIntervals: any[];
    ngOnInit(){
        // console.log('Events1')
        // console.log(this.events)
        this.hourIntervals = this.createIntervals(this.startOfDay)
        // this.events = this.events.sort(this.compare)
        // console.log('Events2')
        // console.log(this.events)
    }

    createIntervals(startOfDayStr:string){
        let startOfDayMs = parseInt(startOfDayStr)
        let returnArr =[]
        for(let i = 0; i < 24; i++){
            returnArr.push({
                startTime:(startOfDayMs + i*3600000),
                endTime:(startOfDayMs + (i+1)*3600000 - 1)
            });
        }
        console.log(returnArr);
        return returnArr
        
    }

    getHourEvents(hourInterval:any){
        return this.events.filter( event =>{
            return parseInt(event.start) >= hourInterval.startTime && parseInt(event.start) <= hourInterval.endTime;
        });
    }

    compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    toInt(str){
        return parseInt(str);
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