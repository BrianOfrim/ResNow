import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'res-date',
  providers: [],
  directives: [],
  templateUrl: "app/res-date/res-date.html",
  styleUrls: ["app/res-date/res-date.css"],
  pipes: []
})

export class ResDate{
    @Input() date: string;
    @Input() events: any[]; 
    @Output() displayRes: EventEmitter<any> = new EventEmitter(false);
    @Output() displayDay: EventEmitter<any> = new EventEmitter(false);

    todaysEvents:Observable<any>;
    currDate:Date;
    daysOfWeek: String[] = ['S','M','T','W','R','F','S'];
    currDOW: String;
    
    ngOnInit(){
        this.currDate = new Date(parseInt(this.date));
        this.currDOW = this.daysOfWeek[this.currDate.getDay()];
        // this.events.subscribe(x =>{
        //     console.log(x);
        // })
        let startOfDayDate = new Date(this.currDate.getTime());
        // startOfDayDate.setHours(0,0,0,0);
        // var endOfDayDate = new Date(this.currDate.getTime());
        // endOfDayDate.setHours(23,59,59,999);  

        // this.todaysEvents = this.events.map(events =>{
        //     console.log(events);
        //     return events.filter(event =>{
        //         return event.start >= startOfDayDate.getTime() && event.start <= endOfDayDate.getTime();
        //     })
        // });
    }
    getStartTime(event){
        return new Date(event.start);
    }
    getEventTitle(event){
        let eventTitle:string;
        if(event.title != ""){
            eventTitle = event.title;
        }else{
            eventTitle = '\u00A0'; // non-breaking white space
        }
        return eventTitle;
    }

    displayDayEvents(){
        console.log("Show day's events")
        this.displayDay.emit(this.date)
    }

    displayEvent(event){
        this.displayRes.emit(event)
    }
}