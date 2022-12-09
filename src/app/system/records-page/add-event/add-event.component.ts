import { Bill } from './../../shared/models/bill.model';
import { BillService } from './../../shared/services/bill.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { APPEvent } from '../../shared/models/event.model';

import * as moment from 'moment'
import { EventsService } from '../../shared/services/events.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { mergeMap } from 'rxjs/operators';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input() categories: Category[] = []
  constructor( private eventsService: EventsService, private billService :BillService) { }

  ngOnInit(){
    this.message = new Message('danger', '')
  }

  sub1: Subscription | any
  sub2: Subscription | any


  onSubmit(form:NgForm){

    let {amount, description, category, type } = form.value;
    if(amount < 0) amount*=-1
    
    const event = new APPEvent(
      type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description
    )


     this.sub1 = this.billService.getBill()
     .subscribe((bill: Bill)=>{
      let value = 0;
         if(type === 'outcome'){
           if (amount > bill.value){
            this.showMessage(`На счету недостаточно средств.Вам нехватает ${amount-bill.value}`)
               return;
           }else{
            value = bill.value - amount
           }

         }else{
          value = bill.value + amount
         }

         this.sub2 = this.billService.updateBill({value, currency: bill.currency})
         .pipe(
         mergeMap(()=> this.eventsService.addEvent(event))
     )
         .subscribe(()=>{
          form.setValue({
            amount: 1,
            description: ' ',
            category: 1,
            type: 'outcome'
          })
         })

     })

    // this.eventsService.addEvent(event)
  }

  private showMessage(text:string){
    this.message.text = text;
    window.setTimeout(()=> this.message.text = '',5000)
}

  types = [
    {type:'income', label: 'Доход'},
    {type:'outcome', label: 'Расход'}
  ]

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    if(this.sub2) this.sub2.unsubscribe();
    
  }

  message: Message | any
 
}
