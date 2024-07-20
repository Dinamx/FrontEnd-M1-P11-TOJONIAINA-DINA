import { Injectable } from '@angular/core';
import {WebservicesService} from "../../webservice/webservices.service";
import axios from "axios";
import {url} from "../../../app.component";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private webservicesService: WebservicesService) { }

  async getList() {
    try {
      const response = await this.webservicesService.getData('/student/all');
      console.log('Liste des étudiants :', response);
      return response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des  étudiants :', error);
      throw error; 
    }
  }

  async insert(formData: any) {
    try {
      const response = await this.webservicesService.insertData( formData , '/student' );
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      throw error;
    }
  }

  async getStudentById(id: string) {
    try {
      const response = await axios.get(`${url}/student/${id}`);
      console.log('Fiche etudiant :', response.data);
      return response.data;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des  étudiants :', error);
      throw error; 
    }
  }

}
