import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";
import axios from "axios";
import {url} from "../../../app.component";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private webservicesService: WebservicesService) { }

  async getSearchBenefice(mois: number, annee: number) {
    try {
        const response = await axios.get(`${url}/statistiques/benefice/${mois}/${annee}`);
        console.log('search Benefice :', response.data);
        return response.data;
    } catch (error) {
        alert('Erreur : ' + error);
        console.error('Erreur lors de la récupération de la benefice :', error);
        throw error;
    }
}

  async getBenefice() {
    try {
      const response = await this.webservicesService.getData('/statistiques/benefice');
      console.log('Benefice :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la benefice :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

  async getSearchChiffre(mois: number, annee: number) {
    try {
        const response = await axios.get(`${url}/statistiques/chiffre_affaire/${mois}/${annee}`);
        console.log('search Chiffre :', response.data);
        return response.data;
    } catch (error) {
        alert('Erreur : ' + error);
        console.error('Erreur lors de la récupération de la benefice :', error);
        throw error;
    }
}

  async getChiffre() {
    try {
      const response = await this.webservicesService.getData('/statistiques/chiffre_affaire');
      console.log('CA :', response);
      // Gérer la réponse  ici
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération du CA :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

}
