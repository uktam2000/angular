import { Category } from './../../shared/models/category.model';
import { APPEvent } from './../../shared/models/event.model';
import { mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { EventsService } from '../../shared/services/events.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event:APPEvent | any;
  category:Category | any;

  s1:Subscription | any
  isLoaded = false;



  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService, 
    private eventsServers: EventsService
    ) { }

  ngOnInit(){
    this.s1 = this.route.params
    .pipe(
      mergeMap((params:Params)=> this.eventsServers.getEventsById(params['id'])),
      mergeMap((event:APPEvent)=>{
        this.event = event;
        return this.categoriesService.getCategoryById(event.category)
      })
      )
      .subscribe((category:Category)=>{
      this.category = category;
      this.isLoaded = true;
     
    })
   
   
  }

  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe()
    }
  }

}
