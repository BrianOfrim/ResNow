import {Reservation2,IReservation2} from './reservation2'
import 'rxjs/add/operator/map';
import { Injectable, Inject } from 'angular2/core';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<IReservation2[]>;
    constructor(af: AngularFire, @Inject(FirebaseRef) private ref: Firebase){
        const path = `/`;
        this.reservationItems$ = af.list(path) as FirebaseListObservable<IReservation2[]>;

        this.ref = ref.child(path);

    }

    createReservation(reservation: Reservation2): Promise<any>{
        return this.reservationItems$.add(reservation);
    }
}