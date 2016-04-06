/**
 * Created by brianofrim on 2016-04-03.
 */
import 'rxjs/add/operator/map';
import { Injectable, Inject } from 'angular2/core';
import { AngularFire, FirebaseListObservable, FirebaseRef } from 'angularfire2';
import { Reservation, IReservation } from './core/reservation/reservation';

@Injectable()
export class RsvpService{
    rsvpItems$: FirebaseListObservable<IReservation[]>;
    constructor(af: AngularFire, @Inject(FirebaseRef) private ref: Firebase){
        const path = `/`;
        this.rsvpItems$ = af.list(path) as FirebaseListObservable<IReservation[]>;

        this.ref = ref.child(path);

    }

    createRsvp(name:string,startTime:string,endTime:string): Promise<any>{
        return this.rsvpItems$.add(new Reservation(name,startTime,endTime));
    }

}