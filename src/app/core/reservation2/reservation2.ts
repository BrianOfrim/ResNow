/**
 * Created by brianofrim on 2016-04-09.
 */
export interface IReservation2{
    $key?: string;
    //createdAt: number;
    name: string;
    note: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    meridiem: string;
}

export class Reservation2 implements IReservation2{
    //createdAt: Firebase.ServerValue.TIMESTAMP;
    name: string;
    note: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    meridiem: string;

    constructor(name:string, note: string, year: number, month: number,day: number,hour: number,minute: number,meridiem: string){
        this.name = name;
        this.note = note;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minute = minute;
        this.meridiem = meridiem;
    }
}