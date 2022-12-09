import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent{

  @Output() onFilterCancel = new EventEmitter<any>()
  @Output() onFilterApply = new EventEmitter<any>()

  @Input() categories:Category[] = [];

  constructor() { }

  selectedPeriod = 'd';
  selectedTypes:any[] = [];
  selectedCategories:any[] = [];

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ]

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ]

  closeFilter(){
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.onFilterCancel.emit();
  }


  handleChangeType(e:any,value:any){
    console.log('sgmgmgm',e.checked, value);
    const checked = e.checked
      if(checked){
        this.selectedTypes.indexOf(value) === -1 ? this.selectedTypes.push(value) :null;
      }else{
        this.selectedTypes = this.selectedTypes.filter(i=> i !== value)
      }
      
  }

  handleChangeCategory(e:any, value:any){
    console.log('sgmgmgm',e.checked, value);
    const checked = e.checked
      if(checked){
        this.selectedCategories.indexOf(value) === -1 ? this.selectedCategories.push(value) :null;
      }else{
        this.selectedCategories = this.selectedCategories.filter(i=> i !== value)
      }
  }

  applyFilter(e:any){
    this.onFilterApply.emit({
        types: this.selectedTypes,
        categories: this.selectedCategories,
        period: this.selectedPeriod
    })
  }


  

}
