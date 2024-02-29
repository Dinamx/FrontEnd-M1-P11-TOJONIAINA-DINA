import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { TablerIconsModule } from "angular-tabler-icons";
import { MatCardModule } from "@angular/material/card";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableModule } from "@angular/material/table";
import { AsyncPipe, CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { Rendezvous } from 'src/app/models/interfaces';
import { RendezvousServiceService } from "../../../services/controllers/rendezvous/rendezvous-service.service";
import { ServicesService } from "../../../services/controllers/services.service";


@Component({
  selector: 'form-rendez-vous',
  templateUrl: './form-rendez-vous.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
  ],
})
export class FormRendezVousComponent {
  employees: { _id: number, email: string, nom: string }[] = [];
  services: { _id: number, description: string; duree: string, prix: string }[] = [];
  dure: any = '0';
  prix: any = '0';

  userId: any;
  alertMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private rendezvousService: RendezvousServiceService, private servicesService: ServicesService) { }

  selected = '';

  form = new FormGroup({
    date_heure: new FormControl('', [Validators.required]),
    idservice: new FormControl('', [Validators.required]),
    idclient: new FormControl(localStorage.getItem("userId")),
    idemploye: new FormControl('', [Validators.required]),
    prixpaye: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
    rappel: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit() {
    this.userId = localStorage.getItem("userId"); // Récupérer la valeur de userId depuis le local storage
    this.getEmployeeList();
    this.getServiceList();
  }

  async getEmployeeList() {
    try {
      const response = await this.rendezvousService.getEmployeList();
      console.log('Liste des employés récupérée :', response);
      this.employees = response; // Mettez à jour la liste des employés dans votre composant
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des employés :', error);
    }
  }

  async getServiceList() {
    try {
      const response = await this.servicesService.getServicesList();
      console.log('Liste des services récupérée :', response);
      this.services = response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des employés :', error);
    }
  }

  async onServiceSelectionChange(event: any) {
    const selectedServiceId = event.value;
    const selectedService = this.services.find(service => service._id === selectedServiceId);
    const idclient = localStorage.getItem("userId");
    const getPrice = await this.servicesService.getPrice(idclient, selectedServiceId);
    console.log("prix sugg" + this.servicesService.getPrice(idclient, selectedServiceId));
    if (selectedService) {
      this.dure = selectedService.duree;
      this.prix = getPrice;

    }
  }

  async submit() {
    console.log('Form value:', this.form.value);
    if (this.form.valid) {
      console.log('Form submitted successfully');
      try {
        const response = await this.rendezvousService.addRdv(this.form.value);
        const status = response.data.status;
        if (status === "200") {
          this.successMessage = 'Rendez-vous a été bien enregistré.';
        } else if (status === "400") {
          this.alertMessage = 'Employé occupé.';
        } else if (status === "401") {
          this.alertMessage = 'Solde insuffisant.';
        } else {
          this.alertMessage = 'Statut inconnu : ' + status;
        }
      }
      catch (error) {
        console.error('Erreur lors de l\'insertion :', error);
        alert('Erreur lors de l\'insertion');
      }
    }
    else {
      alert('Erreur')
      console.log('Form submission failed');
    }
  }
}
