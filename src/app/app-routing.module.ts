
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'system', loadChildren: ()=> import('./system/system.module').then(m=>m.SystemModule)},
  // { path: '**', pathMatch: 'full', component: NotFoundComponent },
  // {path: '**', component: NotFoundComponent}

];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 