import { Component, Input, OnInit } from '@angular/core';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'

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
  startDate:Date;
  showNote:boolean = false;
  ngOnInit(){
    this.startDate = new Date(parseInt(this.event.start));
  }
  toggleShowNote(){
      this.showNote = !this.showNote;
  }
}
  