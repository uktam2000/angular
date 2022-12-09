import { Subscription } from 'rxjs';
import { CategoriesService } from './../../shared/services/categories.service';

import { Category } from './../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',  
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy{

  @Input() categories:Category[] = [] 
  @Output() onCategoryEdit:any = new EventEmitter<any>()

  constructor(private categoriesService: CategoriesService) { }

  currentCategoryId = 1;
  currentCategory:Category | any

  message:Message | any
  
  sub1:Subscription | any

  ngOnInit() {
    this.message = new Message('success', '')
    this.onCategoryChange() 
  }

  onSubmit(form:NgForm){
    

    let{capacity, name} = form.value;
    if(capacity<0) capacity*=-1

    const category = new Category(name, capacity, +this.currentCategoryId);
    
    this.sub1 = this.categoriesService.updateCategory(category)
    .subscribe((category:Category)=>{
     this.onCategoryEdit.emit(category)
     this.message.text = 'Категория успешно отредактирована.';
     window.setTimeout(()=> this.message.text = '',3000)
    })
 
  }

  onCategoryChange(){
     this.currentCategory = this.categories
    .find(c=> c.id === +this.currentCategoryId)
  }

  ngOnDestroy(){
    if(this.sub1) this.sub1.unsubscribe()
  }

}
