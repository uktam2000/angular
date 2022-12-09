import { combineLatest, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { APPEvent } from '../shared/models/event.model';
import { Category } from '../shared/models/category.model';
import * as moment from 'moment';
@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy{

  constructor(private categoriesService: CategoriesService, private eventsServers: EventsService) { }

  isLoaded = false;
categories:Category[]=[];
events:APPEvent[]=[];
filteredEvents:APPEvent[]=[]
s1: Subscription | any

isFilterVisiable = false;

  ngOnInit() {
    this.s1 = combineLatest([
      this.categoriesService.getCategories(),
      this.eventsServers.getEvents()
    ]).subscribe((data: [Category[], APPEvent[]])=>{
      this.categories = data[0];
      this.events = data[1];
      this.isLoaded = true;

      this.setOriginalEvents()
    })
    
  }

  private setOriginalEvents(){
    this.filteredEvents = this.events.slice()
  }


  private toggleFilterVisibility(dir: boolean){
    this.isFilterVisiable = dir;
  }

  openFilter(){
    this.toggleFilterVisibility(true)
  }

  onFilterApply(dataFilter:any){
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(dataFilter.period).startOf('d');
    const endPeriod = moment().endOf(dataFilter.period).endOf('d');

      console.log('datafilter', dataFilter)

      this.filteredEvents = this.filteredEvents
      .filter((e)=>{
        return dataFilter.types.indexOf(e.type) !== -1;
      })
      .filter((e)=>{
        return dataFilter.categories.indexOf(e.category) !== -1;
      })
      .filter((e)=>{
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod,endPeriod);
      })

  }

  onFilterCancel(){
     this.toggleFilterVisibility(false);
     this.setOriginalEvents()
  }
 
  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe()
    }
    
  }
}
