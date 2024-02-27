import { Injectable } from '@angular/core';
import {WebservicesService} from "../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class OffrespecialeService {

  constructor(private webservicesService: WebservicesService) { }

  async insertOffreSpeciale(formData: any) {
    try {
      const response = await this.webservicesService.insertData( formData , '/offrespeciales/add' );
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

  async getClientList() {
    try {
      const response = await this.webservicesService.getData('/client');
      console.log('Liste des clients récupérée :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des clients :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async getOffreList() {
    try {
      const response = await this.webservicesService.getData('/offrespeciales');
      console.log('Liste des offres speciales récupérée :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des offres speciales :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

}
