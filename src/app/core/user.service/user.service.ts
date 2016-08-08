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
            this.userCalendars = this.af.database.list(`users/${auth.id}/calendars`);
            this.userEvents = this.af.database.list(`users/${auth.id}/events`);
    }
}