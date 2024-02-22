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

const ELEMENT_DATA: Rendezvous[] = [
  {
    date_heure: '2024-02-22T09:00:00',
    service: 'Service 1',
    client: 'Mark J. Freeman',
    employe: 'Employee 1',
    prixpaye: '50',
    comissionemploye: '10',
    duree: '60',
    comission: '15',
    etat_rdv: '1',
  },
  {
    date_heure: '2024-02-22T10:30:00',
    service: 'Service 2',
    client: 'Andrew McDownland',
    employe: 'Employee 2',
    prixpaye: '75',
    comissionemploye: '15',
    duree: '45',
    comission: '20',
    etat_rdv: '1',
  }
];

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeRendezVousComponent {
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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = this.fb.group({date_heure: [''], service: [''], employe: [''], duree: [''], prixpaye: [''],});
    console.log(this.dataSource);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['date_heure', 'service', 'employe', 'duree', 'prixpaye', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const date_heure = item.date_heure.toLowerCase();
      const service = item.service.toLowerCase();
      const employe = item.employe.toLowerCase();
      const duree = item.duree.toLowerCase();
      const prixpaye = item.prixpaye.toLowerCase();
      const searchDate_heure = filterValue.date_heure.toLowerCase();
      const searchService = filterValue.service.toLowerCase();
      const searchEmploye = filterValue.employe.toLowerCase();
      const searchDuree = filterValue.duree.toLowerCase();
      const searchPrixpaye = filterValue.prixpaye.toLowerCase();
      return ((searchDate_heure === '' || date_heure.includes(searchDate_heure)) && (searchService === '' || service.includes(searchService)) && (searchEmploye === '' || employe.includes(searchEmploye)) && (searchDuree === '' || duree.includes(searchDuree)) && (searchPrixpaye === '' || prixpaye.includes(searchPrixpaye)) );
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
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString();
  }


}

