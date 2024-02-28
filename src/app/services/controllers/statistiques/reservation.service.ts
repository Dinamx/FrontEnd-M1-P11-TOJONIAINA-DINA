import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private webservicesService: WebservicesService) { }

 
  async getSearchNombreReservation(mois:number)
  {
    try {
      const response = await axios.get(`http://localhost:3000/statistiques/reservation/${mois}`);
      console.log('search Nombre de reservation :', response.data);
      return response.data;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la recherche :', error);
      throw error;
    }
  }

  async getNombreReservation() {
    try {
      const response = await this.webservicesService.getData('/statistiques/reservation');
      console.log('Nb reservation :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération du Nb reservation :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

}
