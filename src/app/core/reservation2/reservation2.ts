/**
 * Created by brianofrim on 2016-04-09.
 */
export interface IReservation2{
    $key?: string;
    //createdAt: number;
    name: string;
    note: string;
    date: string;
}

export class Reservation2 implements IReservation2{
    //createdAt: Firebase.ServerValue.TIMESTAMP;
    name: string;
    note: string;
    date: string;

    constructor(name:string, note: string, date: string){
        this.name = name;
        this.note = note;
        this.date = date;
    }
}