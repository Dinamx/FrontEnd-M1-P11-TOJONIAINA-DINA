import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private webservicesService: WebservicesService) { }


  async logIn(formData: any) {
    try {
      const response = await this.webservicesService.insertData(formData, '/login');
      console.log('Log In réussie :', response);

      // Gérer la réponse de l'insertion  ici
      return response;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }


  async signUp(formData: any){
    try {
      const response = await this.webservicesService.insertData(formData, '/login/signup');
      console.log('Log In réussie :', response);

      // Gérer la réponse de l'insertion  ici
      return response;
    } catch (error) {
      alert('Eurreur : ' +  error)
      console.error('Erreur lors de l\'insertion :', error);
      throw error; // Propagation de l'erreur pour la gérer au niveau supérieur
    }
  }

}
