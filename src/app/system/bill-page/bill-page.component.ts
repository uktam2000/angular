import { combineLatest, Observable, Subscription } from 'rxjs';
import { BillService } from './../shared/services/bill.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit,OnDestroy {

  constructor(private billservice: BillService) { }

  sub1: Subscription | any;
  sub2: Subscription | any;
  sub3: Subscription | any;
 

  currency!: {usd?:any, eur?:any};
  bill:Bill | any
  isLoaded = false;

  ngOnInit() {
    this.currency = {usd: '', eur:''};
    this.sub1 = combineLatest([
    this.billservice.getBill(),
    this.billservice.getCurrency('EUR', 'RUB', 1),
    this.billservice.getCurrency('USD', 'RUB', 1)
    ]).subscribe((data:any)=>{
      this.bill = data[0];
      this.currency.eur = data[1];
      this.currency.usd = data[2];
      this.isLoaded = true;
    })

  }

  onRefresh(){
   this.isLoaded = false;
   this.sub2 = this.billservice.getCurrency('EUR', 'RUB', 1)
   this.sub3 = this.billservice.getCurrency('USD', 'RUB', 1)
    .subscribe((currency:any)=>{

      this.currency = currency;
      this.isLoaded = true;

    })
  }

  ngOnDestroy(){
    if(this.sub1){
        this.sub1.unsubscribe()
    }
    if(this.sub2){
      this.sub2.unsubscribe()
    }
    if(this.sub3){
      this.sub3.unsubscribe()
    }
  }

}
