import {Component,OnInit,Input,ViewContainerRef,ViewChild} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DATEPICKER_DIRECTIVES,TimepickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { FirebaseListObservable } from 'angularfire2';
import {MODAL_DIRECTVES, BS_VIEW_PROVIDERS,ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';

import { Reservation2, IReservation2 } from '../core/reservation2/reservation2';
import { ResDate } from '../res-date/res-date'
import {  DateService } from '../core/date_services/date_service';
import {ReservationService} from '../core/reservation2/reservation2.service';
import { ResList} from '../res-list/res-list';
import {DayEventList} from '../day-event-list/day-event-list';
import { DayEventSchedule } from '../day-event-schedule/day-event-schedule';
import {WeekDayEventList} from '../week-day-event-list/week-day-event-list';
import {WeekDayEventSchedule} from '../week-day-event-schedule/week-day-event-schedule';

@Component({
  selector: 'res-display',
  providers: [DateService,BS_VIEW_PROVIDERS],
  directives: [ResDate,ResList,MODAL_DIRECTVES,ModalDirective,DATEPICKER_DIRECTIVES,TimepickerComponent,DayEventList,DayEventSchedule,WeekDayEventList,WeekDayEventSchedule],
  templateUrl: "app/res-display/res-display.html",
  styleUrls: ["app/res-display/res-display.css"], 
  pipes: []
})

export class ResDisplay{
    public constructor(private dateService:DateService, public resService: ReservationService){}
    events:any[];
    createNew:boolean;
    dt:Date;
    currentDate:Date;
    modalOpen:boolean;
    hstep: number = 1;
    mstep:number = 10;
    showDayEventList:boolean = true;
    eventToDisplay:Reservation2;
    firstOfCurrentMonth:Date;
    firstOfCurrentWeek:Date;
    currentMonthDisplayDates: any[];
    currentWeekDisplayDates: any[];
    months: String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    showCalendar:boolean;
    showDayEventsModal: boolean = false;
    dateToShow: string;
    displayOption: string;
    daysOfWeek: String[] = ['S','M','T','W','R','F','S'];
    weekDisplayIsList:boolean = true;
    @ViewChild('lgModal')
    lgModal: ModalDirective;
    @ViewChild('dateModal')
    dateModal: ModalDirective;
    ngOnInit(){
        this.eventToDisplay = new Reservation2();
        this.currentDate = new Date();

        this.dt = new Date();
        this.dt.setHours(12,0,0,0);

        this.firstOfCurrentMonth = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
        this.firstOfCurrentMonth.setHours(0,0,0,0);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());  

        this.firstOfCurrentWeek = new Date(this.currentDate.getTime());
        this.firstOfCurrentWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());
        this.firstOfCurrentWeek.setHours(0,0,0,0);
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.firstOfCurrentWeek.getTime().toString());
        console.log("Week dates")
        console.log(this.currentWeekDisplayDates);
        //this.currentYear = currentDate.getYear(); 
        this.events = [];  
        this.createNew = false;  
        this.modalOpen = false;
        this.showCalendar = true;
        this.displayOption = "month";
        this.resService.reservationItems$.subscribe(eventData=>{
            // console.log(eventData)
            this.events = eventData;
        });
    }

    getDate(dateStr:string){
        return new Date(dateStr);
    }

    incrementMonth(){
        this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()+1);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());
    }
    decrementMonth(){
        this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()-1);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());
    }

    incrementWeek(){
        this.firstOfCurrentWeek.setDate(this.firstOfCurrentWeek.getDate()+7);
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.firstOfCurrentWeek.getTime().toString());
    }
    decrementWeek(){
        this.firstOfCurrentWeek.setDate(this.firstOfCurrentWeek.getDate()-7);
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.firstOfCurrentWeek.getTime().toString());
    }

    
    getEvents(startOfDay:string){
        console.log(startOfDay)
        let startOfDayDate = new Date(startOfDay);
        startOfDayDate.setHours(0,0,0,0);
        var endOfDayDate = new Date(startOfDay);
        endOfDayDate.setHours(23,59,59,999);   
        return this.events.filter(event => {
            return (parseInt(event.start) >= startOfDayDate.valueOf()) && (parseInt(event.start) <= endOfDayDate.valueOf())
        });
    }

    createRes(){
        this.createNew = true;
        this.dt = new Date();
        this.dt.setHours(12,0,0,0);
        this.lgModal.show()
    }

    displayReservation(e){
        if(this.showDayEventsModal){
            this.dateModal.hide();
            this.showDayEventsModal = false;
        } 
        this.eventToDisplay = e;
        this.dt = new Date(parseInt(this.eventToDisplay.start))
        this.createNew = false;
        this.lgModal.show()
        
    }

    modalOpening(){
        this.modalOpen = true;
    }

    pushUpdate(updatedReservation: IReservation2){
        let newStart = this.dt
        newStart.setSeconds(0,0);
        updatedReservation.start = newStart.getTime().toString()
        if(this.createNew){
            this.resService.createReservation(updatedReservation)
        }else{
            this.resService.updateReservation(updatedReservation);
        }
        this.lgModal.hide()
    }


    modalClosed(){
       this.eventToDisplay = new Reservation2();
       this.dt = new Date()
       //this.timeDate = new Date()
       console.log(this.eventToDisplay);
       console.log('Modal Closed');
       this.modalOpen = false;
    }

    showDateModal(eventsDate:string){
        this.dateToShow = eventsDate;
        this.showDayEventsModal = true;
        this.dateModal.show()
    }

    dateModalClosed(){
        this.showDayEventsModal = false;
        this.dateToShow = "";
    }
}