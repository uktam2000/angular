import { SystemComponent } from './system.component';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SystemRoutingModule } from './system-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

@NgModule({
   imports:[
    CommonModule, 
    SharedModule,
    SystemRoutingModule],
    
    declarations:[ 
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecordsPageComponent,
        SystemComponent
    ]
})
export class SystemModule{}