import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{



  title = 'Salon de beauté';




  ngOnInit(): void {

  }
}


export const url = 'http//localhost:3000/';
