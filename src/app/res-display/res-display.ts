import {Component,OnInit,Input,ViewContainerRef,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FORM_DIRECTIVES} from '@angular/forms';
import {DATEPICKER_DIRECTIVES,TimepickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { FirebaseListObservable } from 'angularfire2';
import { MODAL_DIRECTIVES ,BS_VIEW_PROVIDERS,ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';

import { Reservation2, IReservation2 } from '../core/reservation2/reservation2';
import {CalendarService} from '../core/calendar.service/calendar.service';
import { ResDate } from '../res-date/res-date'
import {  DateService } from '../core/date_services/date_service';
import {ReservationService} from '../core/reservation2/reservation2.service';
import { ResList} from '../res-list/res-list';
import {DayEventList} from '../day-event-list/day-event-list';
import { DayEventSchedule } from '../day-event-schedule/day-event-schedule';
import {WeekDayEventList} from '../week-day-event-list/week-day-event-list';
import {WeekDayEventSchedule} from '../week-day-event-schedule/week-day-event-schedule';
import { DayResList} from '../day-res-list/day-res-list';
import {DayResSchedule} from '../day-res-schedule/day-res-schedule'
import {Observable} from 'rxjs/Observable';

import {Authentication} from '../authentication/authentication';

@Component({
  selector: 'res-display',
  providers: [DateService,BS_VIEW_PROVIDERS],

  directives: [ResDate,ResList,MODAL_DIRECTIVES,ModalDirective,DATEPICKER_DIRECTIVES,FORM_DIRECTIVES,
  TimepickerComponent,DayEventList,DayEventSchedule,WeekDayEventList,WeekDayEventSchedule,DayResList,DayResSchedule],
  
  templateUrl: "app/res-display/res-display.html",
  styleUrls: ["app/res-display/res-display.css"], 
  pipes: []
})

export class ResDisplay{
    // @Input() reservations: IReservation2[];
    
    public constructor(private dateService:DateService, public resService: ReservationService, private calService: CalendarService,
    private route: ActivatedRoute, private router: Router,private auth: Authentication){
        // this.route.params.subscribe(params => {
        //     this.calendarKey = params['id']; 
        //     console.log("The id = " + this.calendarKey);
        //     this.events = this.calService.getCalendarEvents(this.calendarKey);
        // })
     }
    events: any[] = [];
    createNew:boolean;
    dt:Date;
    currentDate:Date;
    modalOpen:boolean;
    hstep: number = 1;
    mstep:number = 10;
    showDayEventList:boolean = true;
    eventToDisplay:Reservation2;
    eventToDelete:Reservation2;
    calendarKey: string = '';
    calendarName: string = '';
    calendarDescription: string = '';
    // firstOfCurrentMonth:Date;
    // firstOfCurrentWeek:Date;
    displayDate:Date;
    currentMonthDisplayDates: any[];
    currentWeekDisplayDates: any[];
    months: String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    showCalendar:boolean;
    showDayEventsModal: boolean = false;
    dateToShow: string;
    displayOption: string;
    daysOfWeek: String[] = ['S','M','T','W','R','F','S'];
    displayIsList:boolean = true;
    @ViewChild('lgModal')
    lgModal: ModalDirective;
    @ViewChild('dateModal')
    dateModal: ModalDirective;
    @ViewChild('deleteEventModal')
    deleteEventModal: ModalDirective;
    ngOnInit(){
        this.eventToDisplay = new Reservation2();
        this.eventToDelete = new Reservation2();
        this.currentDate = new Date();

        this.dt = new Date();
        this.dt.setHours(12,0,0,0);

        // this.firstOfCurrentMonth = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
        // this.firstOfCurrentMonth.setHours(0,0,0,0);

        this.displayDate = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
        this.displayDate.setHours(0,0,0,0);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.displayDate.getFullYear(), this.displayDate.getMonth());  
        this.createNew = false;  
        this.modalOpen = false;
        this.showCalendar = true;
        this.displayOption = "month";
        this.route.params.subscribe(params => {
            this.calendarKey = params['id']; 
            console.log("The id = " + this.calendarKey);
            
            this.calService.getCalendarEvents(this.calendarKey).subscribe(events => {
                this.events  = events;
            });
            if(this.calendarKey == 'mine'){
                this.calendarName = 'My calendar';
                this.calendarDescription = 'Personal events';
            }else{
                this.calService.getCalendarInfo(this.calendarKey).then(info =>{
                    console.log(name);
                    this.calendarName = info.name;
                    this.calendarDescription = info.description;
                })
            }

            
        })

    }
    

    compareStart(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    sortEvents(evs:any[]){
        return evs.map(x =>{
        return x.sort(function(a, b) {
            return parseInt(a.start) - parseInt(b.start);
        });
        })

    }

    getDate(dateStr:string){
        return new Date(dateStr);
    }

    changeDisplay(option:string){
        this.displayOption = option;
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.displayDate.getTime().toString());
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.displayDate.getFullYear(), this.displayDate.getMonth());  

    }
    incrementMonth(){
        // this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()+1);
        // this.currentMonthDisplayDates = this.dateService.getMonthDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());

        this.displayDate.setMonth(this.displayDate.getMonth()+1);
        this.displayDate.setDate(1);
        console.log(this.displayDate);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.displayDate.getFullYear(), this.displayDate.getMonth());
    }
    decrementMonth(){
        // this.firstOfCurrentMonth.setMonth(this.firstOfCurrentMonth.getMonth()-1);
        // this.currentMonthDisplayDates = this.dateService.getMonthDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());

        this.displayDate.setMonth(this.displayDate.getMonth()-1);
        this.displayDate.setDate(1);
        console.log(this.displayDate);
        this.currentMonthDisplayDates = this.dateService.getMonthDates(this.displayDate.getFullYear(), this.displayDate.getMonth());
    }

    incrementWeek(){
        // this.firstOfCurrentWeek.setDate(this.firstOfCurrentWeek.getDate()+7);
        // this.currentWeekDisplayDates = this.dateService.getWeekDates(this.firstOfCurrentWeek.getTime().toString());

        this.displayDate.setDate(this.displayDate.getDate()+7);
        this.displayDate.setDate(this.displayDate.getDate() - this.displayDate.getDay());
        console.log(this.displayDate);
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.displayDate.getTime().toString());
    }
    decrementWeek(){
        // this.firstOfCurrentWeek.setDate(this.firstOfCurrentWeek.getDate()-7);
        // this.currentWeekDisplayDates = this.dateService.getWeekDates(this.firstOfCurrentWeek.getTime().toString());

        this.displayDate.setDate(this.displayDate.getDate()-7);
        this.displayDate.setDate(this.displayDate.getDate() - this.displayDate.getDay());
        console.log(this.displayDate);
        this.currentWeekDisplayDates = this.dateService.getWeekDates(this.displayDate.getTime().toString());
    }

    incrementDay(){
        this.displayDate.setDate(this.displayDate.getDate() + 1);
        console.log(this.displayDate);
    }

    decrementDay(){
        this.displayDate.setDate(this.displayDate.getDate() - 1);
        console.log(this.displayDate);
    }
    getAllEvents(){
        return this.events;
    }
    getEvents(startOfDay:string){
        //console.log(startOfDay)
        if(!this.events) return; 
        let startOfDayDate = new Date(startOfDay);
        startOfDayDate.setHours(0,0,0,0);
        var endOfDayDate = new Date(startOfDay);
        endOfDayDate.setHours(23,59,59,999);  

        //console.log(startOfDay);
        return this.events
            .filter(event => {
                return event.start >= startOfDayDate.getTime() && event.start <= endOfDayDate.getTime() 
            })
            .sort(this.compareStart);
    }

    createRes(){
        this.createNew = true;
        this.dt = new Date();
        this.dt.setHours(12,0,0,0);
        this.lgModal.show()
    }

    deleteResDialog(ev:IReservation2){
        this.eventToDelete = ev;
        this.deleteEventModal.show()
        
    }

    deleteRes(shouldDelete:boolean){
        if(shouldDelete) this.resService.removeReservation(this.eventToDelete);
        this.eventToDelete = new Reservation2();
        this.deleteEventModal.hide()
        if(shouldDelete) this.lgModal.hide()
    }


    displayReservation(e){
        if(this.showDayEventsModal){
            this.dateModal.hide();
            this.showDayEventsModal = false;
        } 
        this.eventToDisplay = e;
        this.dt = new Date(this.eventToDisplay.start);
        this.createNew = false;
        this.lgModal.show()
        
    }

    modalOpening(){
        this.modalOpen = true;
    }

    pushUpdate(updatedReservation: IReservation2){
        let newStart = this.dt
        newStart.setSeconds(0,0);
        updatedReservation.calendar = this.calendarKey;
        updatedReservation.start = newStart.getTime()
        if(this.createNew){
            this.resService.createReservation(updatedReservation);
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

    toNumber(numStr: string): number{
        return parseInt(numStr);
    }

    canEdit(event: any): boolean{
        // console.log(event.ownerUID)
        // console.log(this.auth.authState.uid)
        if(this.auth.authState.uid== '') return false
        if(event.ownerUID == this.auth.authState.uid){
            return true;
        }else{
            return false;
        }
    }

    showUpdate(event:any): boolean{
        return !this.createNew && this.canEdit(event);
    }


}