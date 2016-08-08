import {Reservation2,IReservation2} from './reservation2'
import {Observable} from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<any>;
    // datequeryItems$: FirebaseListObservable<any>;
   //private authState: FirebaseAuthData | FirebaseAuthState
    constructor(public af: AngularFire, public auth: Authentication){
        // af.auth.subscribe((state: FirebaseAuthState) => {
        //     this.authState = state;
        // });
        this.reservationItems$ = af.database.list(`events/${auth.id}`)
        
    }
    
    private pickSubset(subset: string[],obj:Object){
        let returnObj = {}
        subset.forEach(sub =>{
            returnObj[sub] = obj[sub]
        });
        return returnObj;
    }
    
    private removeString(arrayOfStrings: string[], stringToRemove: string){
        var index = arrayOfStrings.indexOf(stringToRemove);    // <-- Not supported in <IE9
        if (index !== -1) {
            arrayOfStrings.splice(index, 1);
        }
    }

    addToUserEventList(key: string,res :IReservation2): Promise<any>{
        var newPostKey = firebase.database().ref().child(`/users/${this.auth.id}/events`).push().key;
        var updates = {}
        updates[`/users/${this.auth.id}/events/${newPostKey}`] = res;
        if(res.calendar != 'mine') updates[`/calendars/${res.calendar}/events/${newPostKey}`] = res;
        return firebase.database().ref().update(updates);
    }
    
    createReservation(reservation: IReservation2): Promise<any>{
        reservation.ownerUID = this.auth.id;
        return this.addToUserEventList(reservation.$key,reservation);
    }
    
    removeReservation(reservation: IReservation2): Promise<any>{
        console.log("Item deleted" + reservation.$key)
        //var updates = {};
        //updates[`/users/${this.auth.id}/events/${reservation.$key}`] = null;
        //if(reservation.calendar != 'mine') updates[`/calendars/${reservation.calendar}/events/${reservation.$key}`] = null;
        return this.removeFromUserEventList(reservation);
    }

    removeFromUserEventList(reservation: IReservation2): Promise<any>{
        var updates = {}
        updates[`/users/${this.auth.id}/events/${reservation.$key}`] = null;
        if(reservation.calendar != 'mine') updates[`/calendars/${reservation.calendar}/events/${reservation.$key}`] = null;
        console.log(updates);
        return firebase.database().ref().update(updates);
    }
    
    removeFromKey(resKey: string): Promise<any>{
        console.log("reskey"+ resKey);
        return this.reservationItems$.remove(resKey);
    }
    
    // getReservation(resKey:string):Promise<any>{
    //     const queryPromise = this.af.database.object(`events/${this.auth.id}/${resKey}`).$key;
    //     return queryPromise;
    // }
    
    updateReservation(updatedReservation: IReservation2): Promise<any>{
        let keys = Object.keys(updatedReservation);
        this.removeString(keys,"$key");
        let updatedObj = this.pickSubset(keys,updatedReservation);
        var updates = {}
        updates[`/events/${updatedReservation.$key}`] = updatedObj;

        updates[`/users/${this.auth.id}/events/${updatedReservation.$key}`] = updatedObj;
        if(updatedReservation.calendar != 'mine') updates[`/calendars/${updatedReservation.calendar}/events/${updatedReservation.$key}`] = updatedObj;
        return firebase.database().ref().update(updates);
    }

    getCalendarReservations(calID:string): Observable<any>{

        let path = (calID == 'mine') ? `/users/${this.auth.id}/events/` : `/calendars/${calID}/events/`;

        let calObserv = this.af.database.list(path).map(reservations =>{
            return reservations.map(res =>{
                firebase.database().ref(`/events/${res.$key}`).once('value').then(snapshot =>{
                    let ev = snapshot.val();
                    ev.$key = snapshot.key;
                    //console.log(ev);
                    return ev;
                })
            })
            
        });
        return calObserv;
        

    }


}