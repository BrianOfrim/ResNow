import {Component,OnInit, Input, Output,EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { IReservation2, Reservation2 } from '../core/reservation2/reservation2';
import {Authentication} from '../authentication/authentication';


@Component({
  selector: 'day-event-list',
  providers: [],
  directives: [],
  templateUrl: "app/day-event-list/day-event-list.html",
  styleUrls: ["app/day-event-list/day-event-list.css"],
  pipes: []
})

export class DayEventList{
    @Input() events: any[]; 
    @Input() startOfDay: number; 
    @Output() update: EventEmitter<any> = new EventEmitter(false);
    @Output() remove: EventEmitter<any> = new EventEmitter(false);

    constructor(private auth: Authentication){}
    ngOnInit(){}

    eventBelongsToCurrentUser(event: any): boolean{
        console.log(event.ownerUID)
        console.log(this.auth.authState.uid)
        if(this.auth.authState.uid== '') return false
        if(event.ownerUID == this.auth.authState.uid){
            return true;
        }else{
            return false;
        }
    }

    getStartTime(event){
        return new Date(event.start);
    }

}