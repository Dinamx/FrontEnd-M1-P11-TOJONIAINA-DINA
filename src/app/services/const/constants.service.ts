import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  constructor() { }



  link = 'localhost:8080/';



  months = [
    { name: 'Janvier', value: '01' },
    { name: 'Février', value: '02' },
    { name: 'Mars', value: '03' },
    { name: 'Avril', value: '04' },
    { name: 'Mai', value: '05' },
    { name: 'Juin', value: '06' },
    { name: 'Juillet', value: '07' },
    { name: 'Août', value: '08' },
    { name: 'Septembre', value: '09' },
    { name: 'Octobre', value: '10' },
    { name: 'Novembre', value: '11' },
    { name: 'Décembre', value: '12' }
  ];



}
