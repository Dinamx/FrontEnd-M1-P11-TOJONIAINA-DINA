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
import { Offrespeciale} from "../../../models/interfaces";
import {UpdateComponent} from "../liste-employe/update/update.component";



const ELEMENT_DATA: Offrespeciale[] = [
  {
    date_heure_envoi: '2024-02-23 09:00',
    service: 'Service A',
    date_fin: '2024-03-15',
    description: 'Promotion',
    client: 'Mark J. Freeman'
  },
  {
    date_heure_envoi: '2024-02-23 10:30',
    service: 'Service B',
    date_fin: '2024-03-10',
    description: 'Offre spéciale',
    client: 'Andrew McDownland'
  }
];




@Component({
  selector: 'app-liste-offrespeciale',
  templateUrl: './liste-offrespeciale.component.html',
  styleUrls: ['./liste-offrespeciale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeOffrespecialeComponent {
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
    this.searchForm = this.fb.group({
      date_heure_envoi: [''],
      service: [''],
      date_fin: [''],
      description: [''],
      client: [''],
    });
    console.log(this.dataSource);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['date_heure_envoi', 'service', 'date_fin', 'description', 'client', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const date_heure_envoi = item.date_heure_envoi.toLowerCase();
      const service = item.service.toLowerCase();
      const date_fin = item.date_fin.toLowerCase();
      const description = item.description.toLowerCase();
      const client = item.client.toLowerCase();
      const searchDate_heure_envoi = filterValue.date_heure_envoi.toLowerCase();
      const searchService = filterValue.service.toLowerCase();
      const searchDate_fin = filterValue.date_fin.toLowerCase();
      const searchDescription = filterValue.description.toLowerCase();
      const searchClient = filterValue.client.toLowerCase();
      return ((searchDate_heure_envoi === '' || date_heure_envoi.includes(searchDate_heure_envoi)) && (searchService === '' || service.includes(searchService)) && (searchDate_fin === '' || date_fin.includes(searchDate_fin)) && (searchDescription === '' || description.includes(searchDescription)) && (searchClient === '' || client.includes(searchClient)) );
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
