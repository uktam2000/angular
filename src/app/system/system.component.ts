import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html'
})
export class SystemComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(){
    this.router.navigate(['/system','bill'])
  }

}
