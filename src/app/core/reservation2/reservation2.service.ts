import {Reservation2,IReservation2} from './reservation2'
import 'rxjs/add/operator/map';
import { Injectable, Inject } from 'angular2/core';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<IReservation2[]>;
    private authState: FirebaseAuthData | FirebaseAuthState
    constructor(public af: AngularFire, @Inject(FirebaseRef) private ref: Firebase,public auth: Authentication){
        af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
        this.reservationItems$ = af.list(`events/${auth.id}`) as FirebaseListObservable<IReservation2[]>;
    }
    createReservation(reservation: Reservation2): Promise<any>{
        return this.reservationItems$.add(reservation);
    }
    
    removeReservation(reservation: IReservation2): Promise<any>{
        console.log("Item deleted" + reservation.$key)
        return this.reservationItems$.remove(reservation.$key);
    }
}