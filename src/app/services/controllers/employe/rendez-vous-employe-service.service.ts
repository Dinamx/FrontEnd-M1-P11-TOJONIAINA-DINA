import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class RendezVousEmployeServiceService {

  constructor(private webservicesService: WebservicesService) { }


  async getRendezVous(idEmploye : String) {
    try {
      const response = await this.webservicesService.getDataById('/',idEmploye);
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
