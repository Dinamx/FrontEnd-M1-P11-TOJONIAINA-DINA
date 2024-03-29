import {Component, HostListener} from '@angular/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {basicImportsModule} from "../../../basicImports.module";
import {ServicesService} from "../../../services/controllers/services.service";
import {Service} from "../../../models/interfaces";
import {Router} from "@angular/router";
import axios from "axios";
import {url} from "../../../app.component";

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss'],
  standalone : true,
  imports: [
    // Autres imports
    MatCheckboxModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule , basicImportsModule
  ],

})
export class LandingPagesComponent {


  style: string = 'background: transparent';

  data: any[] = [
    {
      img: 'bg.jpg',
      description: 'Maquillage',
      duree: '50min',
      prix: 200000,
    },
    {
      img: 'bg.jpg',
      description: 'Maquillage',
      duree: '50min',
      prix: 200000,
    },
    {
      img: 'bg.jpg',
      description: 'Maquillage',
      duree: '50min',
      prix: 200000,
    },
    {
      img: 'bg.jpg',
      description: 'Maquillage',
      duree: '50min',
      prix: 200000,
    },
    {
      img: 'bg.jpg',
      description: 'Maquillage',
      duree: '50min',
      prix: 200000,
    },
  ];

  animationFrameId: number | null = null;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(() => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition == 0) {
        this.style = 'background: transparent; color: black';
      } else {
        this.style =
          'background: rgb(26, 26, 26); box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.116); color: white';
      }
    });
  }


  isLoading: boolean = false;
  // servicesListResearch: Service[] | undefined;
  servicesListResearch: any[]  = [];
  constructor(private servicesService: ServicesService , private router: Router) { }

  login: boolean = true;
  async ngOnInit(): Promise<void> {



    this.isLoading = true;
    try {

      if (localStorage.getItem('userId')){
        this.login = false;
        const servicesList = await this.servicesService.getServicesListUser(<string>localStorage.getItem('userId'));
        console.log('Services list:', servicesList);

        this.servicesListResearch = servicesList;
        console.log('RECHERCHE + ' + this.servicesListResearch)
      }
      else{
        const servicesList = await this.servicesService.getServicesList();
        console.log('Services list:', servicesList);
        this.servicesListResearch = servicesList;
        console.log('RECHERCHE + ' + this.servicesListResearch)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des services :', error);
    } finally {
      this.isLoading = false;
      console.log('Chargement terminé'); // Pour vérifier
    }
  }


  goToConnexion() {
    this.router.navigateByUrl('/');
  }

  goToRDV() {
    this.router.navigate(['dashboard/rendezVous']);
  }

  async delete(idService: string, i: number) {
    try {
      this.servicesListResearch[i].favori = 0;
      const idUser = <string>localStorage.getItem('userId');

      const dataToSEnd = {
        client: idUser,
        service: idService
      };

      const response = await axios.post(`${url}/preference/delete`, dataToSEnd);
      console.log('Préférence supprimée avec succès :', response.data);


    } catch (e) {
      alert(e);
    }

  }

  async favoriser(idService: string, i: number) {
    try {
      const idUser = <string>localStorage.getItem('userId');
      this.servicesListResearch[i].favori = 1;
      const response = await axios.post(`${url}/preference/`, {
        client: idUser,
        service: idService
      });



    } catch (e) {
      alert(e);
    }

  }
}
