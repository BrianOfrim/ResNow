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
 
    userCalendars: any[] = [];
    userEvents: any[] = [];
    
    newUserEvents: Observable<any[]>;
    constructor(private af: AngularFire,private auth: Authentication){
        // this.userCalendars = this.af.database.list(`users/${auth.id}/calendars`);
        this.newUserEvents = this.af.database.list(`users/${auth.id}/events`)
        .map(events =>{
            return events.map(event =>{
                firebase.database().ref('/events/'+ event["$key"]).once("value")
                .then(snapshot =>{
                    let ev = snapshot.val();
                    ev["$key"] = snapshot.key;
                    console.log(ev);
                    return ev;
                })
            })
            // console.log(returnVal);
            // return returnVal;
            

            // return events.map(event=>{
            //     event.color = "yellow";
            //     console.log(event);
            //     return event;
            // })
        })
        this.af.database.list(`users/${auth.id}/events`,{
            query : {
                orderByChild: 'start'
            }
        }).subscribe(events => {
            this.userEvents = [];
            events.forEach(event =>{
                console.log(event['$key']);
                firebase.database().ref('/events/'+ event["$key"]).once("value").then(snapshot => {

                    let ev = snapshot.val();
                    ev["$key"] = snapshot.key;
                    console.log(ev);
                    this.userEvents.push(ev);
                })
            });
        });
        this.af.database.list(`users/${auth.id}/calendars`).subscribe(calendars => {
            this.userCalendars = [];
            calendars.forEach(calendar =>{
                console.log(calendar['$key']);
                firebase.database().ref('/calendars/'+ calendar["$key"]).once("value").then(snapshot => {
            
                    let cal = snapshot.val();
                    cal["$key"] = snapshot.key;
                    console.log(cal)
                    this.userCalendars.push(cal);
                })
            });
        });



            
    }

    private getIndex(array: any[], event: any){
        for( let i = 0; i < array.length; i++){
            if(array[i].$key == event.$key) return i;
        }
        return -1; 
    }

    public getUserCalendars(): Observable<any[]>{
        return this.af.database.list(`users/${this.auth.id}/calendars`).map(calendars=>{
            return calendars.map(calendar =>{
                firebase.database().ref('/calendars/'+ calendar["$key"]).once('value').then(snapshot =>{
                    let cal = snapshot.val()
                    cal['$key'] = snapshot.key;
                    console.log(cal);
                    return cal;
                })
            })
        })
    }
}