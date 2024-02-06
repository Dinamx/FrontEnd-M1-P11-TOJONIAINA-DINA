import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import {FormRendezVousComponent} from "./client/form-rendez-vous/form-rendez-vous.component";
import {ListeRendezVousComponent} from "./client/liste-rendez-vous/liste-rendez-vous.component";

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
];
