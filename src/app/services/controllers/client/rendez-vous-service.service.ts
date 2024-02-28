import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class RendezVousServiceService {

  constructor(private webservicesService: WebservicesService) { }

  async getRendezVousList(idClient: string) {
    try {
      const response = await this.webservicesService.getDataById('/employes/rendezvous', idClient);
      console.log('ListeRendez Vous :', response);
      // Gérer la réponse de l'insertion  ici
      return response.data;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async insertRendezVous(formData: any) {
    try {
      const response = await this.webservicesService.insertData(formData, '/rendezVous');
      console.log('ListeRendez Vous :', response);
      // Gérer la réponse de l'insertion  ici
      return response;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


}
