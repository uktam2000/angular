import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi{
    constructor(public http: HttpClient){
    
      super(http)
    }

    // getBill():Observable<any>{
    //    return this.http.get('http://localhost:3000/bill')
    //    .pipe(
    //     // map((response: any) => response.json())
    //    ) 
    // }


    getBill():Observable<any>{
         return this.get('bill')
   }



    

    getCurrency(to:any, from:any, amount:number){
        const headerDict = {
            apikey: "vUGAUWH6OJta62BuIsI90hhNpC4ZQxEm"
          }; 
        
          const requestOptions:any = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict)
          };
          console.log(requestOptions);
          return this.http.get(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions);
    }




}