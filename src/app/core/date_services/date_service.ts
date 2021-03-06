import { Injectable, Inject } from '@angular/core';
@Injectable()
export class DateService{

    private chunkData(data,chunkSize){
        let returnData = []
        for(var i = 0; i < data.length;i +=chunkSize){
            returnData.push(data.slice(i, i+ chunkSize));
        }
        return returnData;
    }
    public getMonthDates(year:number, month:number){
        var firstOfMonth = new Date(year,month,1);
        firstOfMonth.setHours(0, 0, 0,0);
        var lastOfMonth = new Date(year,month + 1,0);
        lastOfMonth.setHours(0, 0, 0,0);
        var fistDisplayDate = firstOfMonth
        var lastDisplayDate = lastOfMonth
        fistDisplayDate.setDate(fistDisplayDate.getDate() - fistDisplayDate.getDay())
        lastDisplayDate.setDate(lastDisplayDate.getDate() + 6 - lastDisplayDate.getDay())

        var displayDates = []
        var currDay = firstOfMonth
        while(currDay<=lastDisplayDate){
            displayDates.push(currDay.getTime())
            currDay.setDate( currDay.getDate() + 1);
        }
        return this.chunkData(displayDates,7)
    }

    public getWeekDates(dateStr:string){
        let date = new Date(parseInt(dateStr));
        
        // get start of week
        date.setDate(date.getDate() - date.getDay())
        let returnArr = []
        for(let i = 0; i < 7; i++){
            returnArr.push(date.getTime())
            date.setDate(date.getDate() + 1)
        }
        return returnArr
    }
}