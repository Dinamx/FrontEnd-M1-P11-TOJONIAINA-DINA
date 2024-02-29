import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";
import axios from "axios";
import {url} from "../../../app.component";

@Injectable({
  providedIn: 'root'
})
export class RendezVousServiceService {

  constructor(private webservicesService: WebservicesService) { }


  async TerminerRdv(idrdv:string)
  {
    try {
      const response = await axios.get(`${url}/employes/terminer_rendez_vous/${idrdv}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la recherche :', error);
      throw error;
    }
  }

  
  async ValiderRdv(idrdv:string)
  {
    try {
      const response = await axios.get(`${url}/employes/validate_rdv/${idrdv}`);
      return response.data;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la recherche :', error);
      throw error;
    }
  }

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
