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


const ELEMENT_DATA: Rendezvous[] = [
  {
    date_heure: '2024-02-22T09:00:00',
    service: 'Service 1',
    client: 'Mark J. Freeman',
    employe: 'Employee 1',
    prixpaye: '50',
    rappel: '1',
    comissionemploye: '10',
    duree: '60',
    comission: '15',
    etat_rdv: '1',
    etat_valid: '1',
  },
  {
    date_heure: '2024-02-22T09:00:00',
    service: 'Service 1',
    client: 'Mark J. Freeman',
    employe: 'Employee 1',
    prixpaye: '50',
    rappel: '1',
    comissionemploye: '10',
    duree: '60',
    comission: '15',
    etat_rdv: '1',
    etat_valid: '1',
  }
];

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
    , MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule, MatProgressSpinnerModule,],
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
      this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }
  }
  formatDateEnFrancais(date: Date): string {
    return <string>this.datePipe.transform(date, 'dd MMMM yyyy hh:mm', 'fr-FR');
  }
  constructor(private fb: FormBuilder, private dialog: MatDialog , private rendezvousService: RendezVousServiceService , public datePipe: DatePipe) {
    this.searchForm = this.fb.group({
      id: [''],
      date_heure: [''],
      service: [''],
      client: [''],
      employe: [''],
      prixpaye: [''],
      comissionemploye: [''],
      duree: [''],
      comission: [''],
      etat_rdv: [''],
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
      console.error('Erreur lors de la récupération de la liste des services :', error);
    } finally {
      this.isLoading = false;
      console.log('Chargement terminé'); // Pour vérifier
    }
  }




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = [ 'date_heure', 'service', 'client', 'prixpaye', 'comissionemploye', 'duree', 'comission', 'etat_rdv', 'action'];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const date_heure = item.date_heure.toLowerCase();
      const service = item.service.toLowerCase();
      const client = item.client.toLowerCase();
      const employe = item.employe.toLowerCase();
      const prixpaye = item.prixpaye.toLowerCase();
      const comissionemploye = item.comissionemploye.toLowerCase();
      const duree = item.duree.toLowerCase();
      const comission = item.comission.toLowerCase();
      const etat_rdv = item.etat_rdv.toLowerCase();
      const searchDate_heure = filterValue.date_heure.toLowerCase();
      const searchService = filterValue.service.toLowerCase();
      const searchClient = filterValue.client.toLowerCase();
      const searchEmploye = filterValue.employe.toLowerCase();
      const searchPrixpaye = filterValue.prixpaye.toLowerCase();
      const searchComissionemploye = filterValue.comissionemploye.toLowerCase();
      const searchDuree = filterValue.duree.toLowerCase();
      const searchComission = filterValue.comission.toLowerCase();
      const searchEtat_rdv = filterValue.etat_rdv.toLowerCase();
      return ((searchDate_heure === '' || date_heure.includes(searchDate_heure)) && (searchService === '' || service.includes(searchService)) && (searchClient === '' || client.includes(searchClient)) && (searchEmploye === '' || employe.includes(searchEmploye)) && (searchPrixpaye === '' || prixpaye.includes(searchPrixpaye)) && (searchComissionemploye === '' || comissionemploye.includes(searchComissionemploye)) && (searchDuree === '' || duree.includes(searchDuree)) && (searchComission === '' || comission.includes(searchComission)) && (searchEtat_rdv === '' || etat_rdv.includes(searchEtat_rdv)));
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
}
