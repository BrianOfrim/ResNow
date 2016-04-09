/**
 * Created by brianofrim on 2016-04-06.
 */
import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'datepicker-demo',
    templateUrl: 'app/datepicker.component.html',
    directives: [DATEPICKER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class DatepickerDemo {
    public dt:Date = new Date();
    public minDate:Date = void 0;
    public events:Array<any>;
    public todayDate:Date;
    public formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
    public format:string = this.formats[0];
    public dateOptions:any = {
        formatYear: 'YY',
        startingDay: 1
    };
    //constructor(){}
    private opened:boolean = false;

    public constructor() {
        this.todayDate = new Date;
        (this.minDate = new Date()).setDate(this.todayDate.getDate());
    }
    public getDate():number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    }
    public today():void {
        this.dt = new Date();
    }

    public disabled(date:Date, mode:string):boolean {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    }

    public open():void {
        this.opened = !this.opened;
    }

    public clear():void {
        this.dt = void 0;
    }

    public toggleMin():void {
        this.dt = new Date(this.minDate.valueOf());
    }

    public addNewEvent(): void{

    }
}