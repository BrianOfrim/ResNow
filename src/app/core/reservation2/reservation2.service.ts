import {Reservation2,IReservation2} from './reservation2'
import 'rxjs/add/operator/map';
import { Injectable, Inject } from 'angular2/core';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<IReservation2[]>;
    private authState: FirebaseAuthData | FirebaseAuthState
    constructor(public af: AngularFire, @Inject(FirebaseRef) private ref: Firebase){
        af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
        const path = '/' + this.id;
        this.reservationItems$ = af.list(path) as FirebaseListObservable<IReservation2[]>;

        this.ref = ref.child(path);

    }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }
    createReservation(reservation: Reservation2): Promise<any>{
        return this.reservationItems$.add(reservation);
    }
}