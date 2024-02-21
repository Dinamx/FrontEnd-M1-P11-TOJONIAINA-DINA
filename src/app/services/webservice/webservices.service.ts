import { Injectable } from '@angular/core';
import axios from "axios";
import {url} from "../../app.component";


@Injectable({
  providedIn: 'root'
})
export class WebservicesService {

  constructor() { }






  async getData(api : string){
    try {
      const response = await axios.get(`${url}${api}` );
      // Gérer les données de la réponse ici
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      throw error;
    }
  }
  async postData(data : any , api: string){
    try {

      const response = await axios.post(`${url}${api}` , data );
      // Gérer les données de la réponse ici
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      throw error;
    }
  }





}
