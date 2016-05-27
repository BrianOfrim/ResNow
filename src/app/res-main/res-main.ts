import {Component,OnInit} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {UserEntry} from  "../userEntry/userEntry"
import {ReservationService} from "../core/reservation2/reservation2.service"
import {ResList} from "../res-list/res-list"
import {Schedule} from 'primeng/primeng'

@Component({
  selector: 'res-main',
  providers: [ReservationService],
  directives: [UserEntry,ResList,Schedule],
  templateUrl: "app/res-main/res-main.html"
,
  pipes: []
})

export class ResMain{
  constructor(private reservationService: ReservationService){}
    events: any[];

    ngOnInit() {
        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-01-01"
            },
            {
                "title": "Long Event",
                "start": "2016-01-07",
                "end": "2016-01-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-01-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-01-11",
                "end": "2016-01-13"
            }
        ];
    }

}
