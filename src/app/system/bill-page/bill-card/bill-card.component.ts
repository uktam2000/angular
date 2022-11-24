import { BillService } from './../../shared/services/bill.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'] 
})
export class BillCardComponent implements OnInit {

  @Input() bill:Bill | any
  @Input() currency: any
 
  dollar:any;
  euro:any;

  constructor() { }

  ngOnInit() {
   this.dollar = this.currency.usd.result * this.bill.value;
   this.euro = this.currency.eur.result * this.bill.value;
   console.log('wefddwf',this.euro)
  }

 

}
