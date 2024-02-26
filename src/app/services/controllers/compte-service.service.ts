import { Injectable } from '@angular/core';
import {WebservicesService} from "../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class CompteServiceService {

  constructor(private webservicesService: WebservicesService) { }


  async insertCompte(formData: any) {
    try {
      const response = await this.webservicesService.insertData(formData, '/compte');
      console.log('Insertion réussie :', response);
      // Gérer la réponse de l'insertion  ici
      return response;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async getMontant(idClient : string) {
    try {
      const response = await this.webservicesService.getDataById('/', idClient);
      console.log('Montant Compte Actuel récupérée :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      return {
        montant : 0
      };
      // alert('Erreur : ' + error);
      // console.error('Erreur lors de la récupération de la liste des services :', error);
      // throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }
}


