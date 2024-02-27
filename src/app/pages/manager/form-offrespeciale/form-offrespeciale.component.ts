import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ChoixClientComponent} from "./choix-client/choix-client.component";
import {ServicesService} from "../../../services/controllers/services.service";
import {OffrespecialeService} from "../../../services/controllers/offrespeciale.service";


@Component({
  selector: 'app-form-offrespeciale',
  templateUrl: './form-offrespeciale.component.html',
  styleUrls: ['./form-offrespeciale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,MatSelectModule,MatMenuModule,MatIconModule,TablerIconsModule,MatCardModule,NgApexchartsModule,MatTableModule,CommonModule,FormsModule, MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatDatepickerModule,ReactiveFormsModule,MatDialogModule,AsyncPipe]})


export class FormOffrespecialeComponent {
  client: { _id: number, email: string }[] = [];
  services: { _id: number, description: string ; duree: string }[] = [];
  successMessage: string | null = null;

  constructor(private router: Router  , private dialog: MatDialog,private offreSpecialesService: OffrespecialeService,private servicesService: ServicesService) {
  }


  selected = '';



  clients = [
    {value: 'client1', viewValue: 'Client  1'},
    {value: 'client2', viewValue: 'Client  2'},
    {value: 'client3', viewValue: 'Client  3'}
  ];


  service = [
    {value: 'service1', viewValue: 'Service  1'},
    {value: 'service2', viewValue: 'Service  2'},
    {value: 'service3', viewValue: 'Service  3'}
  ];


  form = new FormGroup({
    date_heure_envoi: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    date_fin: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    client: new FormControl([]),
  });

  openClientSelectionDialog(): void {
    const dialogRef = this.dialog.open(ChoixClientComponent, {
      width: '250px',
      data: {} // Vous pouvez passer des données au dialogue si nécessaire
    });

    dialogRef.afterClosed().subscribe(result => {
      // Vérifie si le contrôle de formulaire 'client' existe avant d'appeler setValue
      const clientControl = this.form.get('client');
      if (clientControl && result && result.length >  0) {
        clientControl.setValue(result);
      }
    });
  }


  get f() {
    return this.form.controls;
  }

  ngOnInit() 
  {
    this.getClientList();
    this.getServiceList();
  }

  async getClientList() {
    try {
      const response = await this.offreSpecialesService.getClientList();
      console.log('Liste des clients récupérée :', response);
      this.client = response; // Mettez à jour la liste des employés dans votre composant
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des employés :', error);
    }
  }

  async getServiceList()
  {
    try {
      const response = await this.servicesService.getServicesList();
      console.log('Liste des services récupérée :', response);
      this.services = response; 
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des employés :', error);
    }
  }

  submit() {

    if (this.form.valid) {

      console.log('Form submitted successfully');
      console.log('Form value:', this.form.value);
      alert('Insertion dans service effectuée');
      //Insert




      this.router.navigate([self]);
    } else {
      alert('Erreur')
      console.log('Form submission failed');
    }
  }
}
