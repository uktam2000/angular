import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{

  @Output() onCategoryAdd:any = new EventEmitter<any>();
  constructor( private categoryService: CategoriesService) { }

 
  sub1: Subscription | any
 

  onSubmit(form:NgForm){

    let {name, capacity} = form.value;
    if (capacity < 0) capacity *=-1

    const category = new Category(name, capacity)
    this.sub1 = this.categoryService.addCategory(category)
    .subscribe((category:Category) =>{

      form.reset()
      form.form.patchValue({capacity: 1})
      this.onCategoryAdd.emit(category)
      console.log('hghgjh',category)
    })
  }

  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe()
  }

}
