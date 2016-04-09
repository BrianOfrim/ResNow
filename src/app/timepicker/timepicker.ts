import {Component} from 'angular2/core';


@Component({
  selector: 'timepicker',
  templateUrl: 'app/timepicker/timepicker.html',
  styleUrls: ['app/timepicker/timepicker.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Timepicker {
  hour:number;
  minute:number;
  meridiem:string;


  constructor() {
    this.hour = 12;
    this.minute = 0;
    this.meridiem = "PM"
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
  }ne

  meridiemToggle():void{
    if(this.meridiem == "AM"){
      this.meridiem = "PM";
    }else{
      this.meridiem = "AM";
    }
  }


}
