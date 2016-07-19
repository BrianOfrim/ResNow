/// <reference path="../../../firebase3.d.ts" />


import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable,FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';

@Injectable()
export class CalendarService{

    allCalendars: FirebaseListObservable<any>;
    constructor(private af: AngularFire,private auth: Authentication){
        this.allCalendars = this.af.database.list('calendars');
    }

    createCalendar(calName:string): Promise<any>{
        var newPostKey = firebase.database().ref().child('calendars').push().key;
        var updates = {};
        updates['/calendars/' + newPostKey] = {name: calName, owner: this.auth.id};
        updates['/users/' + this.auth.id + '/calendars/'+ newPostKey] = {valid:true};


        return firebase.database().ref().update(updates); 
    }


}