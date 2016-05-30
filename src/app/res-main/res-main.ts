import {Component,OnInit,ViewContainerRef} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {UserEntry} from  "../userEntry/userEntry"
import {ReservationService} from "../core/reservation2/reservation2.service"
import {ResList} from "../res-list/res-list"
import {Schedule,Dialog} from 'primeng/primeng'
import {Modal, BS_MODAL_PROVIDERS,BSModal} from 'angular2-modal/plugins/bootstrap';
import {ResDetail,ResDetailData} from '../res-detail/res-detail';
@Component({
  selector: 'res-main',
  providers: [ReservationService],
  directives: [UserEntry,ResList,Schedule,Dialog],
  viewProviders: [BS_MODAL_PROVIDERS ],
  templateUrl: "app/res-main/res-main.html"
,
  pipes: []
})

export class ResMain{
  constructor(private reservationService: ReservationService,public modal: Modal, viewContainer: ViewContainerRef){
    modal.defaultViewContainer = viewContainer;
  }
    events: any[];
    headerConfig:any;
    calendarMode:boolean;
    listMode:boolean;
    handleDayClick(e){
      console.log(e.date)  
    }
    
    ngOnInit() {
        this.calendarMode = true;
        this.listMode = false;
        this.headerConfig = {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        };
        
        this.reservationService.reservationItems$.subscribe( eventData => {
          this.events = eventData.map(ev =>{
            let startDate = new Date(ev.start);
            startDate =   new Date( startDate.getTime() - ( startDate.getTimezoneOffset() * 60000 ) );
            let endDate = new Date(ev.end);
            endDate =   new Date( endDate.getTime() - ( endDate.getTimezoneOffset() * 60000 ) );
            ev.start = startDate.toISOString();
            ev.end = startDate.toISOString();
            return ev;
          })
          console.log(this.events)
        })
    }
    
    setCalendarMode(){
      this.calendarMode = true;
      this.listMode = false;
    }
    
    setListMode(){
      this.calendarMode = false;
      this.listMode = true;
    }
    
    showDetailModal(e) {
      console.log(e)
      return this.modal.open(ResDetail,new ResDetailData(e.calEvent));
    }

}
