import { Injectable } from '@angular/core';
import {WebservicesService} from "../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class OffrespecialeService {

  constructor(private webservicesService: WebservicesService) { }

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
