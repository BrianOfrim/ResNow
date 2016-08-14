/// <reference path="../../../firebase3.d.ts" />

import {Observable} from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseObjectObservable,FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';

@Injectable()
export class CalendarService{

    allCalendars: FirebaseListObservable<any>;
    constructor(private af: AngularFire,public auth: Authentication){
        this.allCalendars = this.af.database.list('calendars');
    }

    createCalendar(calName:string,calDescription:string): Promise<any>{
        var newPostKey = firebase.database().ref().child('calendars').push().key;
        var updates = {};
        updates['/calendars/' + newPostKey] = {name: calName, owner: this.auth.authState.uid, description: calDescription};
        updates['/users/' + this.auth.authState.uid + '/calendars/'+ newPostKey] = {name: calName, description: calDescription};
        updates['/calendarInfo/' + newPostKey] = {name: calName, owner: this.auth.authState.uid, description: calDescription};


        return firebase.database().ref().update(updates); 
    }

    deleteCalendar(calID:string): Promise<any>{
        // this.af.database.list(`calendars/${calID}/events`).subscribe( 
        //     events => {
        //         if(events.length > 0){
        //         console.log(events);
        //         events.forEach(event => {
        //             console.log(event.title);
        //             let evUpdate = {};
        //             evUpdate[`users/${event.ownerUID}/events/${event.$key}`] = null;
        //             firebase.database().ref().update(evUpdate); 
        //         });
        //         console.log("for each done")
        //         var updates = {};
        //         updates[`/calendars/${calID}`] = null;
        //         updates[`/users/${this.auth.id}/calendars/${calID}`] = null;
        //         updates[`/calendarInfo/${calID}`] = null;

        //         firebase.database().ref().update(updates); 
        //         }
        //     },
        //     e =>{console.log(e)},
        //     () => {console.log('complete')}
        // )
        let id = this.auth.authState.uid;
        //console.log(id);
        return firebase.database().ref(`calendars/${calID}/events`).once('value').then(function(snapshot){
            let events = snapshot.val();
            for(var key in events){
                if(events.hasOwnProperty(key)){
                    console.log(key);
                    console.log(events[key]);
                    let evUpdate = {};
                    evUpdate[`users/${events[key].ownerUID}/events/${key}`] = null;
                    firebase.database().ref().update(evUpdate); 
                }
            }
            var updates = {};
            console.log(id);

            updates[`/calendars/${calID}`] = null;
            updates[`/users/${id}/calendars/${calID}`] = null;
            updates[`/calendarInfo/${calID}`] = null;

            firebase.database().ref().update(updates); 
        })
    }

    getCalendarEvents(calID: string): FirebaseListObservable<any>{
        if(calID == "mine"){
            return this.af.database.list(`users/${this.auth.authState.uid}/events`)
        }else{
            return this.af.database.list(`calendars/${calID}/events`);
        }
        
    }


    getCalenarEventsOnDay(calID: string, startOfDay :number, endOfDay: number): Observable<any>{
        return this.af.database.list(`calendars/${calID}/events`,{
            query: {
                orderByChild: 'start',
                startAt: startOfDay,
                endAt: endOfDay
            }
        });
    }

    getCalenarEventsForHour(calID: string, hourInterval: any): Observable<any>{
        return this.af.database.list(`calendars/${calID}/events`,{
            query: {
                orderByChild: 'start',
                startAt: hourInterval.startTime,
                endAt: hourInterval.endTime
            }
        });
    }
}