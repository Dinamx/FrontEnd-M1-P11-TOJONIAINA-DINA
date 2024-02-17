import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import {FormRendezVousComponent} from "./client/form-rendez-vous/form-rendez-vous.component";
import {ListeRendezVousComponent} from "./client/liste-rendez-vous/liste-rendez-vous.component";
import {FormServiceComponent} from "./manager/form-service/form-service.component";
import {ListeServiceComponent} from "./manager/liste-service/liste-service.component";
import {FormEmployeComponent} from "./manager/form-employe/form-employe.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  //Prise de rendez Vous pour client
  {
    path: 'formrendezVous',
    component: FormRendezVousComponent,
    data: {
      title: 'Prise de rendez Vous',
    },
  },
  //Liste de rendez Vous pour client
  {
    path: 'rendezVous',
    component: ListeRendezVousComponent,
    data: {
      title: 'Prise de rendez Vous',
    },
  },
  //  MANAGER

  //Ajout service pour MANAGER
  {
    path: 'formservice',
    component: FormServiceComponent,
    data: {
      title: 'Creation de service',
    },
  },
  //Liste service pour MANAGER
  {
    path: 'listeservice',
    component: ListeServiceComponent,
    data: {
      title: 'Liste des service',
    },
  },
  //Liste Employe pour MANAGER
  {
    path: 'listeemploye',
    component: ListeServiceComponent,
    data: {
      title: 'Liste des employés',
    },
  },
  //Nouvel Employe pour MANAGER
  {
    path: 'formemploye',
    component: FormEmployeComponent,
    data: {
      title: 'Nouvel Employé ',
    },
  },


];
