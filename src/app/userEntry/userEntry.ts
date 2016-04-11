/**
 * Created by brianofrim on 2016-04-06.
 */
import {Component,OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {Reservation2} from '../core/reservation2/reservation2'

@Component({
  selector: 'user-entry',
  templateUrl: 'app/userEntry/userEntry.html',
  styleUrls: ['app/userEntry/userEntry.css'],
  directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],

})

export class UserEntry {
  hour:number;
  minute:number;
  meridiem:string;
  name:string;
  note:string;
  public dt:Date = new Date();

  public minDate:Date = void 0;
  public events:Array<any>;
  public todayDate:Date;
  public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  public format:string = this.formats[0];
  public dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };

  private opened:boolean = false;


  constructor(private reservationService :ReservationService) {}

  ngOnInit() {
    this.todayDate = new Date;
    (this.minDate = new Date()).setDate(this.todayDate.getDate());
    this.hour = 12;
    this.minute = 0;
    this.meridiem = "PM";
    this.name = "";
    this.note = "";
  }

  public getDate():number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
  public today():void {
    this.dt = new Date();
  }

  public disabled(date:Date, mode:string):boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  public open():void {
    this.opened = !this.opened;
  }

  public clear():void {
    this.dt = void 0;
  }

  public toggleMin():void {
    this.dt = new Date(this.minDate.valueOf());
  }
  upHour():void{
    if(this.hour == 12){
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
    if(this.minute == 45){
      this.minute = 0;
      this.upHour();
    } else{
      this.minute = this.minute + 15;
    }
  }
  downMinute():void{
    if(this.minute == 0){
      this.minute = 45;
      this.downHour();
    }else{
      this.minute = this.minute - 15;
    }
  }

  meridiemToggle():void{
    if(this.meridiem == "AM"){
      this.meridiem = "PM";
    }else{
      this.meridiem = "AM";
    }
  }
  addReservation(): void{
    this.reservationService.createReservation(new Reservation2(this.name,this.note,
        this.dt.getFullYear(),this.dt.getMonth(),this.dt.getDay(),this.hour,this.minute,this.meridiem));

  }
}
