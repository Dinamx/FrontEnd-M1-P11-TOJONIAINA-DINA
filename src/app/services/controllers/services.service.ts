import { Injectable } from '@angular/core';
import {WebservicesService} from "../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private webservicesService: WebservicesService) { }


  async insertServiceData(formData: any) {
    try {
      const response = await this.webservicesService.insertData(formData, '/services/add');
      console.log('Insertion réussie :', response);
      // Gérer la réponse de l'insertion  ici
      return response;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async getServicesList() {
    try {
      const response = await this.webservicesService.getData('/services');
      console.log('Liste des services récupérée :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des services :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async updateService(){

  }



}