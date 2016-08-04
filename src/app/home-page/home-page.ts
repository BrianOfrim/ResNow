import {Component,OnInit} from '@angular/core';
import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

import {HomePageEvent} from '../home-page-event/home-page-event';
import {HomePageCalendar} from '../home-page-calendar/home-page-calendar';

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
  providers: [],
  directives: [HomePageEvent,HomePageCalendar,TYPEAHEAD_DIRECTIVES],
  pipes: []
})
export class HomePage implements OnInit{
    events:any[] = [];
    currentCalendars: any[] = [];
    newCalName:string = "";

    public asyncSelected:string = '';
    public dataSource:Observable<any>;
    public typeaheadLoading:boolean = false;
    public typeaheadNoResults:boolean = false;

    constructor(private resService:ReservationService,private calService:CalendarService,private userService:UserService,
    private route: ActivatedRoute, private router: Router){
    this.dataSource = Observable.create((observer:any) => {
      let query = new RegExp(this.asyncSelected, 'ig');
 
      observer.next(this.currentCalendars.filter((calendar:any) => {
        return query.test(calendar.name);
      }));
    });
    this.userService.newUserEvents.subscribe(x=>{
        console.log(x);
    })
    }
    ngOnInit(){
        this.calService.allCalendars.subscribe(incomingCalendars =>{
            //console.log(incomingCalendars);
            this.currentCalendars = incomingCalendars;
        });

        this.userService.getUserCalendars().subscribe(x=>{
            //console.log(x);
        })

    }
    compare(a,b) {
        if (a.start < b.start)
            return -1;
        if (a.start > b.start)
            return 1;
        return 0;
    }

    createCalendar(calName :string){
        this.calService.createCalendar(calName).then(data =>{
            console.log(data);
        })
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
