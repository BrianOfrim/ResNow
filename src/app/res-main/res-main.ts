import {Component,OnInit,ViewContainerRef,ViewChild} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
//import {Modal, BS_MODAL_PROVIDERS,BSModal} from 'angular2-modal/plugins/bootstrap';

import {ReservationService} from '../core/reservation2/reservation2.service';
import {UserEntry} from  "../userEntry/userEntry"
import {ResList} from "../res-list/res-list"
// import {Schedule,Dialog} from 'primeng/primeng'
import {ResDetail,ResDetailData} from '../res-detail/res-detail';
import { Reservation2, IReservation2 } from '../core/reservation2/reservation2';
// import {ResCalendar} from '../res-calendar/res-calendar';
import { ResModal } from '../res-modal/res-modal';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ResDisplay} from '../res-display/res-display';


@Component({
  selector: 'res-main',
  providers: [ReservationService],
  directives: [UserEntry,ResList,MODAL_DIRECTIVES,ResDisplay],
  templateUrl: "app/res-main/res-main.html",
  pipes: []
})

export class ResMain{
  viewContainerRef:ViewContainerRef
  listMode:boolean;
  calendarMode:boolean;
  reservation:IReservation2;
  @ViewChild('modal') modal: ModalComponent;
  constructor(private reservationService :ReservationService, viewContainerRef:ViewContainerRef){
    this.viewContainerRef = viewContainerRef;
    this.calendarMode = true;
    this.listMode = false;
    this.reservation = new Reservation2()
  }

  ngOnInit(){
      this.listMode = false;
      this.calendarMode = true;
  }
  setCalendarMode(){
    this.calendarMode = true;
    this.listMode = false;
  }
  
  setListMode(){
    this.calendarMode = false;
    this.listMode = true;
  }
    closed() {
      this.reservationService.updateReservation(this.reservation);
    }

    dismissed() {
    }

    opened() {
    }

    navigate() {
    }
    updateExisting(e){
      this.reservation = e;
      console.log(this.reservation)
      this.modal.open()
    }

    openModal() {
        this.modal.open();
    }

}
