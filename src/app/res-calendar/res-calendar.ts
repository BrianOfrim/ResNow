import {Component,OnInit,ViewContainerRef} from '@angular/core';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {Schedule} from 'primeng/primeng';
//import {Modal, BS_MODAL_PROVIDERS,BSModal} from 'angular2-modal/plugins/bootstrap';
import {ResDetail,ResDetailData} from '../res-detail/res-detail';
import { Reservation2 } from '../core/reservation2/reservation2';


@Component({
  selector: 'res-calendar',
  providers: [],
  directives: [Schedule],
  viewProviders: [],
  templateUrl: "app/res-calendar/res-calendar.html"
})

export class ResCalendar{
  constructor(private reservationService: ReservationService){}
    events: any[];
    headerConfig:any;

    
    ngOnInit() {
        this.headerConfig = {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        };
        
        this.reservationService.reservationItems$.subscribe( eventData => {

          this.events = eventData.map(ev =>{
            let startDate = new Date(parseInt(ev.start));
            startDate =   new Date( startDate.getTime() - ( startDate.getTimezoneOffset() * 60000 ) );
            let endDate = new Date(parseInt(ev.end));
            endDate =   new Date( endDate.getTime() - ( endDate.getTimezoneOffset() * 60000 ) );
            console.log('Start '+startDate);
            console.log('End '+endDate)
            ev.start = startDate.toISOString();
            ev.end = endDate.toISOString();
            return ev;
          })
          console.log(this.events)
        })
    }
    
    
    handleDayClick(e){
      console.log(e.date.format()); 
      //return this.modal.open(ResDetail,new ResDetailData(new Reservation2()))  
    }
    
    handelEventClick(e) {
      console.log(e)
      
      let tempRes = new Reservation2(e.calEvent.title,e.calEvent.name,e.calEvent.note,e.calEvent.start.format('x'),e.calEvent.start.format('x'))
      console.log(tempRes);
      console.log(e.calEvent.$)
      //return this.modal.open(ResDetail,new ResDetailData(tempRes,e.calEvent.$key));
      
    }
    
}