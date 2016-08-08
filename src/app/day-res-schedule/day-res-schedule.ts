import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';

import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import { DayResScheduleItem } from '../day-res-schedule-item/day-res-schedule-item'
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'day-res-schedule',
  providers: [],
  directives: [DayResScheduleItem],
  templateUrl: "app/day-res-schedule/day-res-schedule.html",
  styleUrls: ["app/day-res-schedule/day-res-schedule.css"],
  pipes: []
})

export class DayResSchedule{
    @Input() events: any[]; 
    @Input() startOfDay: number;
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    hourIntervals: any[];
    ngOnInit(){
        this.hourIntervals = this.createIntervals(this.startOfDay)
    }

    createIntervals(startOfDay:number){

        let returnArr =[]
        for(let i = 0; i < 24; i++){
            returnArr.push({
                startTime:(startOfDay + i*3600000),
                endTime:(startOfDay + (i+1)*3600000 - 1)
            });
        }
        return returnArr
        
    }

    getHourEvents(hourInterval:any){
        return this.events.filter( event =>{
            return parseInt(event.start) >= hourInterval.startTime && parseInt(event.start) <= hourInterval.endTime;
        });
    }



    
    getStartTime(startVal:number){
        return new Date(startVal)
    }

  emitUpdate(res){
    this.update.emit(res)
  }

}