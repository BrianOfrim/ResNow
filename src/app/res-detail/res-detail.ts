import {Component,Input,Output} from '@angular/core';
import{DialogRef,ModalComponent} from 'angular2-modal/index';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';
import { Reservation2 } from '../core/reservation2/reservation2';
import { ReservationService } from '../core/reservation2/reservation2.service';

export class ResDetailData extends BSModalContext{
    constructor(public reservation:Reservation2, public resKey?:string){
        super()
    }
}

@Component({
    selector: 'res-detail',
    styleUrls:['app/res-detail/res-detail.css'],
    templateUrl: 'app/res-detail/res-detail.html',
    providers: [ReservationService],
    directives: [],
    pipes: []
})
 
export class ResDetail implements ModalComponent<ResDetailData>{
    context:ResDetailData;
    currRes:Reservation2;
    resKey:string
    constructor(public dialog: DialogRef<ResDetailData>, private reservationService:ReservationService){
        this.context = dialog.context;
        console.log(this.context);
        this.currRes = this.context.reservation;
        this.resKey = this.context.resKey;
    }
    
    onKeyUp(){
        if(this.resKey){
            this.reservationService.removeFromKey(this.resKey);
            this.reservationService.createReservation(this.currRes)
        }else{
            this.reservationService.createReservation(this.currRes)
        }
        this.dialog.close();
    }
}