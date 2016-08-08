import { Component, Input, Output ,OnInit,EventEmitter } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'

@Component({
  selector: 'home-page-calendar',
  templateUrl: 'app/home-page-calendar/home-page-calendar.html',
  styleUrls: ['app/home-page-calendar/home-page-calendar.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class HomePageCalendar implements OnInit{
  @Input() calendar: any;
  @Output() goToCalendar: EventEmitter<any> = new EventEmitter(false);
  @Output() giveDetails: EventEmitter<any> = new EventEmitter(false);
  ngOnInit(){
  }

  goTo(){
      console.log(this.calendar);
      this.goToCalendar.emit(this.calendar.$key);
  }

  deleteCalendar(){
    this.giveDetails.emit(this.calendar);
  }
}