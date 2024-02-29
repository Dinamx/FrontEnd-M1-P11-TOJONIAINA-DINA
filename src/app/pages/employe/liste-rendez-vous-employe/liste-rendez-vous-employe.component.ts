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
import {AsyncPipe, CommonModule, DatePipe} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UpdateComponent} from "./update/update.component";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {Rendezvous} from "../../../models/interfaces";
import {RendezVousServiceService} from "../../../services/controllers/client/rendez-vous-service.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";


// const ELEMENT_DATA: Rendezvous[] = [
//   {
//     date_heure: '2024-02-22T09:00:00',
//     service: 'Service 1',
//     client: 'Mark J. Freeman',
//     employe: 'Employee 1',
//     prixpaye: '50',
//     rappel: '1',
//     comissionemploye: '10',
//     duree: '60',
//     comission: '15',
//     etat_rdv: '1',
//     etat_valid: '1',
//   },
//   {
//     date_heure: '2024-02-22T09:00:00',
//     service: 'Service 1',
//     client: 'Mark J. Freeman',
//     employe: 'Employee 1',
//     prixpaye: '50',
//     rappel: '1',
//     comissionemploye: '10',
//     duree: '60',
//     comission: '15',
//     etat_rdv: '1',
//     etat_valid: '1',
//   }
// ];

@Component({
  selector: 'app-liste-rendez-vous-employe',
  templateUrl: './liste-rendez-vous-employe.component.html',
  styleUrls: ['./liste-rendez-vous-employe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule
    , MatMenuModule
    , MatIconModule
    , TablerIconsModule
    , MatCardModule
    , NgApexchartsModule
    ,
    ReactiveFormsModule,
    MatSelectModule
    , MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule, MatProgressSpinnerModule, MatDatepickerModule],
  providers: [DatePipe],
})
export class ListeRendezVousEmployeComponent {

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource = new MatTableDataSource<any>(this.listResearch);
      this.dataSource.paginator = this.paginator;
    }
  }
  formatDateEnFrancais(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd MMMM yyyy hh:mm', '+0000');
  }
  constructor(private fb: FormBuilder, private dialog: MatDialog , private rendezvousService: RendezVousServiceService , public datePipe: DatePipe) {
    this.searchForm = this.fb.group({
      start: [''],
      end: [''],
      service: [''],
      client: [''],
      prixMin: [''],
      prixMax: [''],
      dureeMin: [''],
      dureeMax: [''],
      etatRdv: [''],
      commission: ['']
    });
    console.log(this.dataSource);
  }

  isLoading: boolean = false;

  listResearch : Rendezvous[] | undefined;

  async ngOnInit() {
    this.isLoading = true;
    try {
      if (localStorage.getItem('userId')){
        console.log(localStorage.getItem('userId'));
      const liste = await this.rendezvousService.getRendezVousList(<string>localStorage.getItem('userId'));
      console.log('Services list:', liste);


      this.listResearch = liste;
      console.log('RECHERCHE + ' + this.listResearch)
      this.dataSource.data = liste;
      }
    } catch (error) {
      alert('Erreur lors de la récupération de la liste des services :'+ error)
      console.error('Erreur lors de la récupération de la liste des services :', error);
    } finally {
      this.isLoading = false;

    }
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = [ 'date_heure', 'service', 'client', 'prixpaye', 'comissionemploye', 'duree', 'comission', 'etat_rdv', 'action'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    console.log('FILTER DATA DANS LISTE RDV EMP')
    console.log('FILTER DATA DANS LISTE RDV EMP')
    if (this.listResearch) {
      const filteredData = this.listResearch.filter(item => {
        // Filtrage par intervalle de date
        const startDate = new Date(filterValue.start);
        const endDate = new Date(filterValue.end);
        const appointmentDate = new Date(item.date_heure);
        const isDateInRange = appointmentDate >= startDate && appointmentDate <= endDate;

        // Filtrage par service
        const serviceMatch = filterValue.service ? item.service.toLowerCase().includes(filterValue.service.toLowerCase()) : true;

        // Filtrage par client
        const clientMatch = filterValue.client ? item.client.toLowerCase().includes(filterValue.client.toLowerCase()) : true;

        // Filtrage par prix min et max
        const prixPayeMin = filterValue.prixPayeMin ? item.prixpaye >= filterValue.prixPayeMin : true;
        const prixPayeMax = filterValue.prixPayeMax ? item.prixpaye <= filterValue.prixPayeMax : true;

        // Filtrage par durée min et max
        const dureeMin = filterValue.dureeMin ? item.duree >= filterValue.dureeMin : true;
        const dureeMax = filterValue.dureeMax ? item.duree <= filterValue.dureeMax : true;

        // Filtrage par état du rendez-vous (1 ou  0)
        const etatRdvMatch = filterValue.etat_rdv ? item.etat_rdv === filterValue.etat_rdv : true;

        // Filtrage par commission (entre  0 et  100)
        const comissionMin = filterValue.comissionMin ? item.comission >= filterValue.comissionMin : true;
        const comissionMax = filterValue.comissionMax ? item.comission <= filterValue.comissionMax : true;

        return isDateInRange && serviceMatch && clientMatch && prixPayeMin && prixPayeMax && dureeMin && dureeMax && etatRdvMatch && comissionMin && comissionMax;
      });
      this.dataSource.data = filteredData;
    }
  }

  services = [
    {value: 'service1', viewValue: 'Service  1'},
    {value: 'service2', viewValue: 'Service  2'},
    // Ajoutez d'autres services  ici
  ];

  etatsRdv = [
    {value: '0', viewValue: 'En attente'},
    {value: '1', viewValue: 'Validé'},
    // Ajoutez d'autres états  ici
  ];

  ismodif = false;
  isdelete = false;

  update(element: any) {
    this.ismodif = true;
    const dialogRef = this.dialog.open(UpdateComponent, {width: '400px', data: element});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          this.isLoading = true;
          this.updateList();


          // Trouver l'index de l'élément dans la liste locale
          const index = this.dataSource.data.findIndex(item => item._id === result._id);
          if (index !== -1) {
            // Mettre à jour l'élément dans la liste locale
            this.dataSource.data[index] = result;
            // Mettre à jour la liste de la source de données
            this.dataSource._updateChangeSubscription();
            this.updateList();
            this.isLoading = true;
          }
        }
        catch (error){
          alert(error);
        }
        finally {
          this.isLoading = false;
        }

      }
    });
  }

  updateList() {
    this.rendezvousService.getRendezVousList(<string>localStorage.getItem('userId')).then(data => {
      this.dataSource.data = data; // Mettez à jour votre source de données avec les nouvelles données
    }).catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    });
  }

  TerminerRdv(elementId: string) {
    const response = this.rendezvousService.TerminerRdv(elementId);
    this.updateList();
  }

  ValiderRdv(elementId: string) {
    const response = this.rendezvousService.ValiderRdv(elementId);
    this.updateList();
  }


  delete(element: any) {
    this.isdelete = true;
  }

  filterTodaysAppointments() {
    const today = new Date();
    today.setHours(0,  0,  0,  0); // Réinitialiser l'heure à minuit pour une comparaison correcte

    // Filtrer les rendez-vous du jour
    const todaysAppointments = this.dataSource.data.filter(appointment => {
      const appointmentDate = new Date(appointment.date_heure);
      return appointmentDate.setHours(0,  0,  0,  0) === today.getTime();
    });

    // Mettre à jour la source de données avec les rendez-vous du jour
    this.dataSource.data = todaysAppointments;
  }
}
