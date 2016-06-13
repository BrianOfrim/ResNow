import {Reservation2,IReservation2} from './reservation2'
import {Observable} from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseRef,FirebaseAuthState } from 'angularfire2';
import {Authentication} from '../../authentication/authentication';
@Injectable()
export class ReservationService{
    reservationItems$: FirebaseListObservable<any>;
    // datequeryItems$: FirebaseListObservable<any>;
    private authState: FirebaseAuthData | FirebaseAuthState
    constructor(public af: AngularFire, @Inject(FirebaseRef) private ref: Firebase,public auth: Authentication){
        af.auth.subscribe((state: FirebaseAuthState) => {
            this.authState = state;
        });
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
    
    createReservation(reservation: Reservation2): Promise<any>{
        return this.reservationItems$.push(reservation);
    }
    
    removeReservation(reservation: IReservation2): Promise<any>{
        console.log("Item deleted" + reservation.$key)
        return this.reservationItems$.remove(reservation.$key);
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
        return this.reservationItems$.update(updatedReservation.$key,updatedObj);
    }


}