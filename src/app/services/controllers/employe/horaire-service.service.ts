import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class HoraireServiceService {

  constructor(private webservicesService :  WebservicesService) { }

  // Dans ton service Angular
  async getHorairesEmploye(idEmploye : string) {
    try {
      const response = await this.webservicesService.getDataById('/horaire', idEmploye );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires :', error);
      throw error;
    }
  }

  async updateHoraireEmploye(formData: any) {
    try {
      const response = await this.webservicesService.insertData( formData , '/horaire/add' );
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires :', error);
      throw error;
    }
  }


}
