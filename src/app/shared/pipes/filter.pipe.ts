import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'appFilter'
})
export class FilterPipe implements PipeTransform{
    // items === events, value === значение инпута, field === поле
    transform(items:any, value: string, field: string):any{
       if(items.length === 0 || !value){
        return items
       }
       return items.filter((i: any)=>{
         const t = Object.assign({}, i);
        if(!isNaN(t[field])){

            t[field] += '';
        }

        if(field === 'type'){
            t[field] =  t[field] === 'income'? 'доход' : 'расход'
        }

        if(field === 'category'){
            t[field] = t['catName']
        }

         return  t[field].toLowerCase().indexOf(value.toLocaleLowerCase()) !==-1;
       })
    }
}