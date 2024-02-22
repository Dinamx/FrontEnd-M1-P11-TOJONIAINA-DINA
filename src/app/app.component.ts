import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{



  title = 'Salon de beauté';



  isload : boolean = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isload = true;
      }
    });
    // this.isload = true;
  }
}


export const url = 'http//localhost:3000/';
