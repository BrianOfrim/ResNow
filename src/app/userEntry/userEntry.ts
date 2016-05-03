/**
 * Created by brianofrim on 2016-04-06.
 */
import {Component,OnInit,AfterViewInit,AfterViewChecked,AfterContentInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {Reservation2} from '../core/reservation2/reservation2'
import {DatePicker,Timepicker} from "ng2-bootstrap/ng2-bootstrap";
import {AngularFire} from 'angularfire2';
@Component({
  selector: 'user-entry',
  templateUrl: 'app/userEntry/userEntry.html',
  styleUrls: ['app/userEntry/userEntry.css'],
  directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES,Timepicker],

})

export class UserEntry {
  
  name:string;
  note:string;
  public dt:Date;
  public minDate:Date = void 0;
  public todayDate:Date;
  public hstep: number;
  public mstep:number;
  public ismeridian:Boolean;
  private opened:boolean = false;
  public timeDate:Date;

  constructor(private reservationService :ReservationService,public af:AngularFire) {}

  ngOnInit() {
    this.todayDate = new Date;
    (this.minDate = new Date()).setDate(this.todayDate.getDate());
    this.hstep = 1;
    this.mstep = 5;
    this.timeDate = new Date()
    this.timeDate.setHours(12);
    this.timeDate.setMinutes(0);
    this.name = "";
    this.note = "";
    this.dt = new Date();
  }
  public toggleMode():void {
    this.ismeridian = !this.ismeridian;
  };
  public disabled(date:Date, mode:string):boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  public open():void {
    this.opened = !this.opened;
  }

  
  addReservation(): void{
    let dateToSend:Date = new Date(this.dt.getFullYear(),this.dt.getMonth(),this.dt.getDate(),
this.timeDate.getHours(),this.timeDate.getMinutes());
    this.reservationService.createReservation(new Reservation2(this.name,this.note,dateToSend.toJSON()));
  }
}
