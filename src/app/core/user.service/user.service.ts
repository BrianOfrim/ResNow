/// <reference path="../../../firebase3.d.ts" />

import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable,FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';
import {Observable} from 'rxjs/Rx';


interface Array<T> {
   findIndex(o: T): Array<T>;
}


@Injectable()
export class UserService{
 
    userCalendars: FirebaseListObservable<any>;
    userEvents: FirebaseListObservable<any>;
    constructor(private af: AngularFire,private auth: Authentication){

            // console.log(`Events = users/${auth.authState.uid}}/events`)
            // console.log(`Calendars = users/${auth.authState.uid}}/calendars`)
           
                console.log(`Events = users/${this.auth.authState.uid}/events`)
                console.log(`Calendars = users/${this.auth.authState.uid}/calendars`)
                this.userCalendars = this.af.database.list(`users/${this.auth.authState.uid}/calendars`);
                this.userEvents = this.af.database.list(`users/${this.auth.authState.uid}/events`);
    }
}