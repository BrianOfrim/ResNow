import {Component, ViewChild,Input,OnInit} from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Reservation2,IReservation2} from '../core/reservation2/reservation2'

@Component({
  selector: 'modal-demo',
  directives: [MODAL_DIRECTIVES],
  templateUrl: 'app/res-modal/res-modal.html',
  styleUrls: ['app/res-modal/res-modal.css']
})
export class ResModal{
    @Input() reservation: IReservation2
    @ViewChild('modal') modal: ModalComponent;

    closed() {
      // TO DO : output event
    }

    dismissed() {
    }

    opened() {
    }

    navigate() {
    }

    open() {
        this.modal.open();
    }

    ngOnInit(){
      this.modal.open()
    }
}