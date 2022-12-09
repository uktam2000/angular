import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApi } from './../../../shared/core/base-api';
import { APPEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi{
    constructor(public http: HttpClient){
      super(http)
    }

    addEvent(event:APPEvent):Observable<any>{

        return this.post('events', event)
    } 

    getEvents():Observable<any>{
      return this.get('events')
    }

    getEventsById(id:string):Observable<any>{
      return this.get(`events/${id}`)

    }
}