import {Component,OnInit,ViewChild} from '@angular/core';
import {TYPEAHEAD_DIRECTIVES, MODAL_DIRECTIVES ,BS_VIEW_PROVIDERS,ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';

import {HomePageEvent} from '../home-page-event/home-page-event';
import {HomePageCalendar} from '../home-page-calendar/home-page-calendar';

import {Reservation2,IReservation2} from '../core/reservation2/reservation2';
import {ReservationService} from '../core/reservation2/reservation2.service';
import {CalendarService} from '../core/calendar.service/calendar.service'; 
import {UserService} from '../core/user.service/user.service';  
import {Observable} from 'rxjs/Observable';

// @RouteConfig([
//   {path: '/', name: 'SignIn', component: SignIn,useAsDefault: true},
//   {path: '/events', name: 'Events', component: ResDisplay}
// ])


@Component({
  selector: 'home-page',
  templateUrl:'app/home-page/home-page.html', 
  styleUrls: ['app/home-page/home-page.css'],
  providers: [BS_VIEW_PROVIDERS,UserService],
  directives: [HomePageEvent,HomePageCalendar,TYPEAHEAD_DIRECTIVES,MODAL_DIRECTIVES,ModalDirective],
  pipes: []
})
export class HomePage implements OnInit{
    events: FirebaseListObservable<any>;
    calendars: FirebaseListObservable<any>;
    allCalendarInfo: Observable<any>;

    currentCalendars: any[] = [];

    newCalName:string = "";
    newCalDescription:string = "";

    calToDelete:any = {name:"",$key:""};
    eventToDelete:Reservation2 = new Reservation2()

    @ViewChild('createCalModal')
    createCalModal: ModalDirective;
    @ViewChild('deleteCalModal')
    deleteCalModal: ModalDirective;
    @ViewChild('deleteEventModal')
    deleteEventModal: ModalDirective;

    asyncSelected:string = '';
    dataSource:Observable<any>;
    typeaheadLoading:boolean = false;
    typeaheadNoResults:boolean = false;
    typeAheadCalendars: any[] = []
    searchTerm: string = "";
    constructor(private resService:ReservationService,private calService:CalendarService,private userService:UserService,
    private route: ActivatedRoute, private router: Router){
        
        
        this.events =  this.userService.userEvents;
        this.dataSource = Observable.create((observer:any) => {
        let query = new RegExp(this.asyncSelected, 'ig');
    
        observer.next(this.currentCalendars.filter((calendar:any) => {
            console.log(calendar.name)
            return query.test(calendar.name);
        }));
        });
    }
    ngOnInit(){ 
        this.calendars = this.userService.userCalendars;
        this.calService.allCalendarInfo.subscribe(incomingCalendars =>{
            //console.log(incomingCalendars);
            this.currentCalendars = incomingCalendars;

        });

    }
    compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    getCalendarsContainingSearch(): any[]{
        if(this.searchTerm == "") return [];
        let searchRe = new RegExp(this.searchTerm, "i");
        return this.currentCalendars.filter(calendar => {
            console.log(calendar);
            console.log(searchRe.test(calendar.name));
            return searchRe.test(calendar.name);
        }).slice(0,10);
    }

    noEventsFound(): boolean{
        let foundEvents = this.getCalendarsContainingSearch()
        return this.searchTerm != "" && foundEvents.length == 0;
    }

    createCalendarDialog(){
        this.createCalModal.show()
    }


    createCalendar(name: any, description: string){
        console.log("Name")
        console.log(name)
        console.log("Description")
        console.log(description)
        this.calService.createCalendar(name,description);
        this.createCalModal.hide();
    }

    deleteEventDialog(selectedEvent: any){
        this.eventToDelete = selectedEvent;
        this.deleteEventModal.show()
    }

    clearEventToDelete(){
        this.eventToDelete = new Reservation2()
    }

    deleteEvent(event:IReservation2){
        this.resService.removeReservation(event);
        console.log("Hide delete event modal");
        this.deleteEventModal.hide();

    }

    deleteCalendarDialog(selectedCal: any){
        this.calToDelete = selectedCal;
        this.deleteCalModal.show();
    }

    clearCalToDelete(){
        this.calToDelete = {name:"",$key:""};
    }

    deleteCalendar(calKey:string){
        this.calService.deleteCalendar(calKey);
        this.deleteCalModal.hide();
    }

    resetCalVars(){
        this.newCalName = "";
        this.newCalDescription = "";
    }

    goToCalendar(calID: string){
        console.log(calID);
        this.router.navigate(['calendar/', calID]);
    }

    public changeTypeaheadLoading(e:boolean):void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e:boolean):void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e:any):void {
        console.log('Selected value: ',e.item);
        this.goToCalendar(e.item.$key);
    }


}
