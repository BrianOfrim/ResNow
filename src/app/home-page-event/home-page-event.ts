import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {Reservation2,IReservation2} from '../core/reservation2/reservation2'
import {CalendarService} from '../core/calendar.service/calendar.service'; 

@Component({
  selector: 'home-page-event',
  templateUrl: 'app/home-page-event/home-page-event.html',
  styleUrls: ['app/home-page-event/home-page-event.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class HomePageEvent implements OnInit{
  @Input() event: IReservation2;
  @Output() goToCalendar: EventEmitter<any> = new EventEmitter(false);
  @Output() giveDetails: EventEmitter<any> = new EventEmitter(false);
  startDate:Date;
  showNote:boolean = false;
  calendarName: string = ""
  constructor(private calService:CalendarService){}
  ngOnInit(){
    this.startDate = new Date(this.event.start);
    if(this.event.calendar == 'mine'){
      this.calendarName = 'My calendar';
    }else{
        this.calService.getCalendarInfo(this.event.calendar).then(info =>{
            this.calendarName = info.name;
        })
    }
  }
  toggleShowNote(){
      this.showNote = !this.showNote;
  }

  goTo(){
      //console.log(this.event.);
      this.goToCalendar.emit(this.event.calendar);
  }

  deleteEvent(){
    this.giveDetails.emit(this.event);
  }
}
  