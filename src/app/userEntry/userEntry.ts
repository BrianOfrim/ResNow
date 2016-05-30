/**
 * Created by brianofrim on 2016-04-06.
 */
import {Component,OnInit,AfterViewInit,AfterViewChecked,AfterContentInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
//import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {Reservation2} from '../core/reservation2/reservation2';
//import {DatePicker,Timepicker,Alert} from "ng2-bootstrap/ng2-bootstrap";
import {DATEPICKER_DIRECTIVES,TimepickerComponent} from 'ng2-bootstrap/ng2-bootstrap';
import {AngularFire} from 'angularfire2';
@Component({
  selector: 'user-entry',
  templateUrl: 'app/userEntry/userEntry.html',
  styleUrls: ['app/userEntry/userEntry.css'],
  directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES,TimepickerComponent],

})

export class UserEntry {
  title:string;
  name:string;
  note:string;
  public dt:Date;
  public startDt:Date;
  public endDt:Date;
  public minDate:Date = void 0;
  public todayDate:Date;
  public hstep: number;
  public mstep:number;
  public timeDate:Date;
  public editingStart:boolean;
  public editingEnd:boolean; // start vs end
  private invalidEnd:boolean;
  constructor(private reservationService :ReservationService,public af:AngularFire) {}

  ngOnInit() {
    this.todayDate = new Date;
    (this.minDate = new Date()).setDate(this.todayDate.getDate());
    this.hstep = 1;
    this.mstep = 5;
    this.timeDate = new Date()
    this.timeDate.setHours(12);
    this.timeDate.setMinutes(0);
    this.timeDate.setSeconds(0);
    this.timeDate.setMilliseconds(0);
    this.title = "";
    this.name = "";
    this.note = "";
    this.editingStart = false;
    this.editingEnd = false;
    this.dt = new Date();
    this.startDt = this.dt;
    this.endDt = this.dt;
    this.startDt.setHours(this.timeDate.getHours());
    this.startDt.setMinutes(this.timeDate.getMinutes());
    this.startDt.setSeconds(this.timeDate.getSeconds());
    this.endDt.setMilliseconds(this.timeDate.getMilliseconds());
    this.endDt.setHours(this.timeDate.getHours());
    this.endDt.setMinutes(this.timeDate.getMinutes());
    this.endDt.setSeconds(this.timeDate.getSeconds());
    this.endDt.setMilliseconds(this.timeDate.getMilliseconds());
    this.invalidEnd = false;
  }

  public editStart():void{
    this.editingStart = true;
    this.editingEnd = false;
    console.log("setting stat " + this.editingStart);
    
  }
  public editEnd():void{
    this.editingEnd = true;
    this.editingStart = false;
  }
  
  public setEnd(){
    this.endDt = this.dt;
    this.endDt.setHours(this.timeDate.getHours());
    this.endDt.setMinutes(this.timeDate.getMinutes()); 
    console.log(this.endDt);     
    this.editingEnd = false;  
  }
  
  public setStart(){
    this.startDt = this.dt;
    this.startDt.setHours(this.timeDate.getHours());
    this.startDt.setMinutes(this.timeDate.getMinutes());
    console.log(this.startDt);
    this.editingStart = false;
  }
  
  public setDateClasses(){
   var classes =  {
      startSelect: this.editingStart,
      endSelect: this.editingEnd,
    }
    return classes
  }
  
  addReservation(): void{
    let newRes = new Reservation2(this.title,this.name,this.note,this.startDt.toISOString(),this.endDt.toISOString());
    if(this.startDt.getTime() > this.endDt.getTime()){
      this.invalidEnd = true;
    }else{
      this.reservationService.createReservation(newRes);
      console.log()
    }
  }
}
