import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {Rendezvous} from "../../../models/interfaces";
import {UpdateComponent} from "../../manager/liste-employe/update/update.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {WebservicesService} from "../../../services/webservice/webservices.service";
import { RendezvousServiceService } from 'src/app/services/controllers/rendezvous/rendezvous-service.service';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ServicesService} from "../../../services/controllers/services.service";



@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatIconModule, TablerIconsModule
    , MatSelectModule
    , MatCardModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
    MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeRendezVousComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ELEMENT_DATA1: Rendezvous[] ;

  // TY GETTENA VIA WS
  services = [
    {value: 'service 1', viewValue: 'Service  1'},
    {value: 'service 2', viewValue: 'Service  2'},
    {value: 'service 3', viewValue: 'Service  3'},
  ];
  isLoading: boolean = true;


  async ngOnInit(){

    try {
      this.isLoading = true;
      this.ELEMENT_DATA1 = await this.rendezvousService.getHistoriqueRdv(<string>localStorage.getItem('userId'));
      // Si vous souhaitez également mettre à jour le tableau de données de la table, faites-le  ici
      this.dataSource.data = this.ELEMENT_DATA1;
      await this.getServiceList();
    }
    catch (e) {
      alert(e);
    }
    finally {
      this.isLoading = false;
    }


  }
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA1);
      this.dataSource.paginator = this.paginator;
    }
  }

  servicesDeroulante: { _id: number, description: string ; duree: string }[] = [];
  async getServiceList()
  {
    try {
      const response = await this.servicesService.getServicesList();
      console.log('Liste des services récupérée :', response);
      this.servicesDeroulante = response;
    } catch (error) {
      alert('Erreur : ' + error);
      console.error('Erreur lors de la récupération de la liste des employés :', error);
    }
  }

  // range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });

  constructor(private fb: FormBuilder, private dialog: MatDialog , private webservicesService: WebservicesService ,private rendezvousService: RendezvousServiceService , private servicesService: ServicesService) {
    this.ELEMENT_DATA1 = [];

    this.searchForm = this.fb.group(
      {
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
        date_heure: [''],
        service: new FormControl(null),
        employe: [''],
        duree: [''],
        prixpaye: [''],
      });
    console.log(this.dataSource);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['date_heure', 'service', 'employe', 'duree', 'prixpaye', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = this.ELEMENT_DATA1.filter(item => {
      const itemDate = new Date(item.date_heure);
      const startDate = filterValue.start ? new Date(filterValue.start) : null;
      let endDate = filterValue.end ? new Date(filterValue.end) : null;

      if (endDate) {
        endDate.setDate(endDate.getDate() + 1);
      }

      // Vérifie si la date de l'élément est dans l'intervalle spécifié
      const isDateInRange = (startDate && endDate) ? itemDate >= startDate && itemDate <= endDate : true;

      // Vérifie si les autres champs correspondent aux valeurs de recherche
      const searchDate_heure = filterValue.date_heure.toLowerCase();
      const searchService = filterValue.service ? filterValue.service.toLowerCase() : '';
      const searchEmploye = filterValue.employe ? filterValue.employe.toLowerCase() : '';
      const searchDuree = filterValue.duree.toLowerCase();
      const searchPrixpaye = filterValue.prixpaye.toLowerCase();

      // Assure que item.service est une chaîne de caractères avant d'appeler toLowerCase()
      const itemService = typeof item.service === 'string' ? item.service.toLowerCase() : '';
      const itemEmploye = typeof item.employe === 'string' ? item.employe.toLowerCase() : '';
      const itemDuree = typeof item.duree === 'string' ? item.duree.toLowerCase() : '';
      const itemPrixpaye = typeof item.prixpaye === 'string' ? item.prixpaye.toLowerCase() : '';

      // Si aucun service ou employé n'est sélectionné, inclure tous les éléments dans les résultats filtrés
      const isServiceMatch = filterValue.service ? itemService.includes(searchService) : true;
      const isEmployeMatch = filterValue.employe ? itemEmploye.includes(searchEmploye) : true;

      return isDateInRange &&
        (searchDate_heure === '' || itemService.includes(searchDate_heure)) &&
        isServiceMatch &&
        isEmployeMatch &&
        (searchDuree === '' || itemDuree.includes(searchDuree)) &&
        (searchPrixpaye === '' || itemPrixpaye.includes(searchPrixpaye));
    });
    this.dataSource.data = filteredData;
  }

  ismodif = false;
  isdelete = false;

  update(element: any) {
    this.ismodif = true;
    const dialogRef = this.dialog.open(UpdateComponent, {width: '400px', data: element});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  delete(element: any) {
    this.isdelete = true;
  }


  formatDate(dateString: string): string {
    const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(dateString).toLocaleDateString();
  }


}

