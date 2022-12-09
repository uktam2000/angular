import { APPEvent } from './../shared/models/event.model';
import { combineLatest, Subscription } from 'rxjs';
import { EventsService } from './../shared/services/events.service';
import { CategoriesService } from './../shared/services/categories.service';
import { BillService } from './../shared/services/bill.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;

  sub1:Subscription | any

  bill: Bill | any;
  categories: Category[] = [];
  events: APPEvent[] = [];


  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService 
  ) { }

  ngOnInit(){
    this.sub1 = combineLatest([

      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ]).subscribe((data: [Bill, Category[], APPEvent[]])=>{
         this.bill = data[0];
         this.categories = data[1];
         this.events = data[2];
         console.log('hfjehfjhfjdfhjh',this.categories)

         this.isLoaded = true

    })

  }

  getCategoryCost(cat:Category):any{
   const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome' );
    return catEvents.reduce((total, e)=>{
      total += e.amount
      return total
    
    },0)
  }

  private getPercent(cat:Category):number{
     const percent = (100 * this.getCategoryCost(cat))/cat.capacity;
     return percent > 100 ? 100 : percent
  }

  getCatPercent(cat:Category):string{
    return this.getPercent(cat) + '%'
  }

  getCatColorClass(cat:Category):string{
    const percent = this.getPercent(cat);
    const className = percent < 60? 'success' : percent >= 100? 'danger' : 'warning'
    return className;
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe();
    
  }

}
