import {Component,OnInit, Input} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';

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
    @Input() events: IReservation2[]; 
    currDate:Date;
    daysOfWeek: String[] = ['S','M','T','W','R','F','S'];
    currDOW: String;
    ngOnInit(){
        this.currDate = new Date(this.date);
        this.currDOW = this.daysOfWeek[this.currDate.getDay()];
    }
    getStartTime(event){
        return new Date(parseInt(event.start));
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
}