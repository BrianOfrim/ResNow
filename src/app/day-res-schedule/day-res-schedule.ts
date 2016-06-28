import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';

import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import { DayResScheduleItem } from '../day-res-schedule-item/day-res-schedule-item'

@Component({
  selector: 'day-res-schedule',
  providers: [],
  directives: [DayResScheduleItem],
  templateUrl: "app/day-res-schedule/day-res-schedule.html",
  styleUrls: ["app/day-res-schedule/day-res-schedule.css"],
  pipes: []
})

export class DayResSchedule{
    @Input() events: IReservation2[]; 
    @Input() startOfDay: string;
    @Output() update: EventEmitter<IReservation2> = new EventEmitter(false);
    @Output() remove: EventEmitter<IReservation2> = new EventEmitter(false);

    hourIntervals: any[];
    ngOnInit(){
        this.hourIntervals = this.createIntervals(this.startOfDay)
        this.events = this.events.sort(this.compare)
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

  emitUpdate(res){
    this.update.emit(res)
  }

}