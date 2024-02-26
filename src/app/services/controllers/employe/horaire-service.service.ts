import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class HoraireServiceService {

  constructor(private webservicesService :  WebservicesService) { }

  // Dans ton service Angular
  async getHorairesEmploye() {
    try {
      const response = await this.webservicesService.getDataById('/employe/horaires', 'idEmployeActuel');
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires :', error);
      throw error;
    }
  }

}
