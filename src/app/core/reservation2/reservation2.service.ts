import {Reservation2,IReservation2} from './reservation2'
import {Observable} from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<any>;
    private authState: FirebaseAuthData | FirebaseAuthState
    constructor(public af: AngularFire, @Inject(FirebaseRef) private ref: Firebase,public auth: Authentication){
        af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
        this.reservationItems$ = af.database.list(`events/${auth.id}`)
    }
    
    // hasDateCollision(reservation:Reservation2): boolean{

    //     this.reservationItems$.forEach(function(reser){
    //         let newDateStart = new Date(reservation.start);
    //         let newDateEnd = new Date(reservation.end);
    //         let prevDateStart = new Date(reser["start"]);
    //         let prevDateEnd = new Date(reser["end"]);
    //         if(newDateStart<=prevDateEnd && newDateEnd>= 
    
    createReservation(reservation: Reservation2): Promise<any>{
        return this.reservationItems$.push(reservation);
    }
    
    removeReservation(reservation: IReservation2): Promise<any>{
        console.log("Item deleted" + reservation.$key)
        return this.reservationItems$.remove(reservation.$key);
    }
}