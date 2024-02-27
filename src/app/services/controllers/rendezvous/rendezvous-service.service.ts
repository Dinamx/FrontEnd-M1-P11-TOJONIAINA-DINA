import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class RendezvousServiceService {

  constructor(private webservicesService :  WebservicesService) { }

  async getEmployeList() {
    try {
      const response = await this.webservicesService.getData('/employes');
      console.log('Liste des employes récupérée :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des services :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

  async addRdv(formData: any) {
    try {
      const response = await this.webservicesService.insertData( formData , '/client/rendezvous/add' );
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires :', error);
      throw error;
    }
  }


}
