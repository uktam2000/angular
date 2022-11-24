import { Injectable } from '@angular/core';
import{HttpClient, HttpResponse} from '@angular/common/http';
import { Observable, pipe} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi{
    constructor(public http: HttpClient){
        super(http)
    }


    // getUserByEmail(email:string):Observable<any>{
    //     return this.http.get(`http://localhost:3000/users?email=${email}`)
    //     .pipe(
    //         tap((res:any)=>{
    //             console.log(res) 
    //         }),
    //        map((user:any)=> user[0] ?  user[0] : undefined)
    //    );
        
    // }

    getUserByEmail(email:string):Observable<any>{
        return this.get(`users?email=${email}`)
             .pipe(
           map((user:any)=> user[0] ?  user[0] : undefined)
       );
    }

    // createNewUser(user: User){
    //     return this.http.post(`http://localhost:3000/users`, user)
    //     .pipe(
    //        map((user:any)=> user[0] ?  user[0] : undefined)
    //    );
    // }


    createNewUser(user: User){
        return this.post('users', user)
        .pipe(
            map((user:any)=> user[0] ?  user[0] : undefined)
                );
    }
} 
