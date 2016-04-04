/**
 * Created by brianofrim on 2016-04-03.
 */
import {NgForm}    from 'angular2/common';
import {Reservation} from './core/reservation/reservation';
import {Component,EventEmitter,Output,ChangeDetectionStrategy} from "angular2/core";
import {RsvpService} from "./rsvp.service"

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rsvp-form',
    templateUrl: 'app/rsvp-form.component.html'
})

export class RsvpFormComponent{

    constructor(private rsvpService :RsvpService){}

    model = new Reservation("John Doe","12","13");


    clear(): void{
        this.model.name = '';
        this.model.startTime = '';
        this.model.endTime = '';
    }

    submitReservation(): void{
        this.model.name  =  this.model.name.trim();
        this.model.startTime = this.model.startTime.trim();
        this.model.endTime = this.model.endTime.trim();
        this.rsvpService.createRsvp(this.model.name,this.model.startTime,this.model.endTime);
        this.clear()
    }

    get diagnostic() {return JSON.stringify(this.model)}
}