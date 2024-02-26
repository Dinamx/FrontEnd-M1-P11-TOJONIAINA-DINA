import { Injectable } from '@angular/core';
import axios from "axios";
import {url} from "../../app.component";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WebservicesService {

  constructor() { }

  async getData(api : string){
    try {
      const response = await axios.get(`${url}${api}` );
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      throw error;
    }
  }
  async getDataById(api : string , id : string){
    try {
      const response = await axios.get(`${url}${api}/${id}` );
      // Gérer les données de la réponse ici
      console.log(response.data);
      return response.data;
    } catch (error) {
      // Gérer les erreurs ici
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
      throw error;
    }
  }
  async insertData(data : any , api: string){
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

  async updateData(data : any , api: string){
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
  async deleteData(data : any , api: string){
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
