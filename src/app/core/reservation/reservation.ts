/**
 * Created by brianofrim on 2016-04-03.
 */
export interface IReservation{
    $key?: string;
    //createdAt: number;
    name: string;
    startTime: string;
    endTime: string;

}

export class Reservation implements IReservation{
    //createdAt: Firebase.ServerValue.TIMESTAMP;
    name: string;
    startTime: string;
    endTime: string;

    constructor(name:string, startTime: string, endTime: string){
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}