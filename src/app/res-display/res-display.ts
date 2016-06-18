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


@Component({
  selector: 'res-display',
  providers: [DateService,BS_VIEW_PROVIDERS],
  directives: [ResDate,ResList,MODAL_DIRECTVES,ModalDirective,DATEPICKER_DIRECTIVES,TimepickerComponent],
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
    mstep:number = 15;
    eventToDisplay:Reservation2;
    firstOfCurrentMonth:Date;
    currentDisplayDates: any[];
    months: String[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    showCalendar:boolean;
    @ViewChild('lgModal')
    lgModal: ModalDirective;

    ngOnInit(){
        this.eventToDisplay = new Reservation2();
        this.currentDate = new Date();
        this.dt = new Date();
        this.dt.setHours(12,0,0,0);
        this.firstOfCurrentMonth = new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),1);
        this.firstOfCurrentMonth.setHours(0,0,0,0);
        //this.currentYear = currentDate.getYear();
        this.currentDisplayDates = this.dateService.getDates(this.firstOfCurrentMonth.getFullYear(), this.firstOfCurrentMonth.getMonth());   
        this.events = [];  
        this.createNew = false;  
        this.modalOpen = false;
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

    createRes(){
        this.createNew = true;
        this.dt = new Date();
        this.dt.setHours(12,0,0,0);
        this.lgModal.show()
    }
    displayReservation(e){
        console.log(this.eventToDisplay);
        this.createNew = false;
        this.eventToDisplay = e;
        this.dt = new Date(parseInt(this.eventToDisplay.start))
        //this.timeDate = new Date(parseInt(this.eventToDisplay.start))
        console.log(this.eventToDisplay);
        this.lgModal.show()
        
    }
    updateExisting(e){
      console.log(e)
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
}