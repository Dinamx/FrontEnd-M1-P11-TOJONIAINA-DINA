import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class TempsmoyenService {

  constructor(private webservicesService: WebservicesService) { }
 
  async getSearchTempsMoyenEmploye(mois:number)
  {
    try {
      const response = await axios.get(`http://localhost:3000/statistiques/temps_moyen_travail/${mois}`);
      console.log('search Temps moyen de travail :', response.data);
      return response.data;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la recherche :', error);
      throw error;
    }
  }

  async getTempsMoyenEmploye() {
    try {
      const response = await this.webservicesService.getData('/statistiques/temps_moyen_travail');
      console.log('Temps moyen :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération du Temps moyen :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

}
