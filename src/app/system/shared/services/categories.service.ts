import { Category } from './../models/category.model';
import { Observable } from 'rxjs';
import { BaseApi } from 'src/app/shared/core/base-api';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesService extends BaseApi { 
    constructor(public http: HttpClient){
        super(http)
    }

    addCategory(category:Category):Observable<any>{
        return this.post('categories', category)
    }
 
    getCategories():Observable<any>{
        return this.get('categories');
    }

    updateCategory(category:Category):Observable<any>{
        return this.put(`categories/${category.id}`,category)

    }

    getCategoryById(id:number):Observable<any>{
        return this.get(`categories/${id}`)
    }
}