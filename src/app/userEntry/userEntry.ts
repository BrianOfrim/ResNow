/**
 * Created by brianofrim on 2016-04-06.
 */
import {Component,OnInit,AfterViewInit,AfterViewChecked,AfterContentInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {Reservation2} from '../core/reservation2/reservation2'
import {DatePicker} from "ng2-bootstrap/ng2-bootstrap";
import {AngularFire} from 'angularfire2';
@Component({
  selector: 'user-entry',
  templateUrl: 'app/userEntry/userEntry.html',
  styleUrls: ['app/userEntry/userEntry.css'],
  directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],

})

export class UserEntry {
  
  name:string;
  note:string;
  public dt:Date;
  public minute:number;
  public hour:number;
  public meridiem:string;
  public minDate:Date = void 0;
  public todayDate:Date;

  private opened:boolean = false;


  constructor(private reservationService :ReservationService,public af:AngularFire) {}

  ngOnInit() {
    this.todayDate = new Date;
    (this.minDate = new Date()).setDate(this.todayDate.getDate());
    this.meridiem = "PM";
    this.name = "";
    this.note = "";
    this.hour = 12;
    this.minute = 0;
    this.dt = new Date();
  }

  public disabled(date:Date, mode:string):boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  public open():void {
    this.opened = !this.opened;
  }

  upHour():void{
    if(this.hour  == 12){
      this.hour = 1;
    } else{
      this.hour = this.hour + 1;
      if(this.hour == 12){
        this.meridiemToggle()
      }
    }
  }
  downHour():void{
    if(this.hour == 1){
      this.hour = 12;
    }else{
      this.hour = this.hour - 1; 
      if(this.hour == 11) {
        this.meridiemToggle();
      }
    }
  }
  upMinute():void{
    if(this.minute == 55){
      this.minute = 0;
      this.upHour();
    } else{
      this.minute = this.minute + 5;
    }
  }
  downMinute():void{
    if(this.minute == 0){
      this.minute = 55;
      this.downHour();
    }else{
      this.minute = this.minute - 5;
    }
  }

  meridiemToggle():void{
    if(this.meridiem == "AM"){
      this.meridiem = "PM";
    }else{
      this.meridiem = "AM";
    }
  }
  convertToArmy():number {
    if(this.hour == 12 && this.meridiem == "AM"){
      return 0;
    } else if(this.meridiem == "PM"){
      return this.hour + 12
    } else{
      return this.hour
    }
  };
  
  addReservation(): void{
    let hourToSend: number = this.convertToArmy()
    let dateToSend:Date = new Date(this.dt.getFullYear(),this.dt.getMonth(),this.dt.getDate(),
    hourToSend,this.minute);
    this.reservationService.createReservation(new Reservation2(this.name,this.note,dateToSend.toJSON()));
  }
}
