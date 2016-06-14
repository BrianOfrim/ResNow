import {Component,OnInit,Input} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { Reservation2, IReservation2 } from '../core/reservation2/reservation2';
import { ResDate } from '../res-date/res-date'
import {  DateService } from '../core/date_services/date_service';
import { FirebaseListObservable } from 'angularfire2';
import {ReservationService} from '../core/reservation2/reservation2.service';
import { ResList} from '../res-list/res-list';

@Component({
  selector: 'res-display',
  providers: [DateService],
  directives: [ResDate,ResList],
  templateUrl: "app/res-display/res-display.html",
  styleUrls: ["app/res-display/res-display.css"],
  pipes: []
})

export class ResDisplay{
    constructor(private dateService:DateService, public resService: ReservationService){}
    events:any[];
    currentDate:Date;
    firstOfCurrentMonth:Date;
    currentDisplayDates: any[];
    months: String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    showCalendar:boolean;

    ngOnInit(){
        this.currentDate = new Date();
        this.firstOfCurrentMonth = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
        this.firstOfCurrentMonth.setHours(0,0,0,0);
        //this.currentYear = currentDate.getYear();
        this.currentDisplayDates = this.dateService.getDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());   
        this.events = [];    
        this.showCalendar = true;
        this.resService.reservationItems$.subscribe(eventData=>{
            console.log(eventData)
            this.events = eventData;
        });
    }

    getDate(dateStr:string){
        return new Date(dateStr);
    }

    incrementMonth(){
        this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()+1);
        this.currentDisplayDates = this.dateService.getDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());
    }
    decrementMonth(){
        this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()-1);
        this.currentDisplayDates = this.dateService.getDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());
    }

    
    getEvents(startOfDay:string){
        let startOfDayDate = new Date(startOfDay);
        startOfDayDate.setHours(0,0,0,0);
        var endOfDayDate = new Date(startOfDay);
        endOfDayDate.setHours(23,59,59,999);   
        // let returnArr =  this.events.filter(event =>{
        //     return (parseInt(event.start) >= startOfDayDate.valueOf()) && (parseInt(event.start) <= endOfDayDate.valueOf())
        // });
        // console.log(returnArr)
        let returnArr = []
        this.events.forEach(event =>{
            // console.log("Evs"+event.start)
            // console.log(startOfDayDate.valueOf())
            if((parseInt(event.start) >= startOfDayDate.valueOf()) && (parseInt(event.start) <= endOfDayDate.valueOf())){
                returnArr.push(event);
            }
        })
        return returnArr

    }
    updateExisting(e){
      console.log(e)
    }
}