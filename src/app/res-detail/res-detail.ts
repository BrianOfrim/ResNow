import {Component,Input,Output} from '@angular/core';
import{DialogRef,ModalComponent} from 'angular2-modal/index';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap/index';

export class ResDetailData extends BSModalContext{
    constructor(public eventToDetail:any){
        super()
    }
}

@Component({
    selector: 'res-detail',
    styleUrls:['app/res-detail/res-detail.css'],
    templateUrl: 'app/res-detail/res-detail.html',
    providers: [],
    directives: [],
    pipes: []
})
 
export class ResDetail implements ModalComponent<ResDetailData>{
    context:ResDetailData;
    currEvent:any;
    constructor(public dialog: DialogRef<ResDetailData>){
        this.context = dialog.context;
        this.currEvent = this.context.eventToDetail;
    }
    
    onKeyUp(){
        this.dialog.close();
    }
}