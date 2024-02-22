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
// import {UpdateComponent} from "./update/update.component";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {UpdateComponent} from "../liste-employe/update/update.component";
import {Service} from "../../../models/interfaces";






const ELEMENT_DATA: Service[] = [
  {
    id: 'service1',
    service: 'Description du service  1',
    prix: 100,
    duree: '1 heure',
    comission: 10
  },
  {
    id: 'service2',
    service: 'Description du service  2',
    prix: 200,
    duree: '2 heures',
    comission: 20
  }
];




@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeServiceComponent {
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
    this.searchForm = this.fb.group(
      {id: [''],
        service: [''],
        duree: [''],
        prix: [''],
        comission: [''],});
    console.log(this.dataSource);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['id', 'service', 'duree', 'prix', 'comission', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const id = item.id.toLowerCase();
      const service = item.service.toLowerCase();
      const duree = item.duree.toLowerCase();
      const prix = item.prix.toString().toLowerCase();
      const comission = item.comission.toString().toLowerCase();
      const searchId = filterValue.id.toLowerCase();
      const searchService = filterValue.service.toLowerCase();
      const searchDuree = filterValue.duree.toLowerCase();
      const searchPrix = filterValue.prix.toLowerCase();
      const searchComission = filterValue.comission.toLowerCase();
      return ((searchId === '' || id.includes(searchId)) &&
        (searchService === '' || service.includes(searchService)) &&
        (searchDuree === '' || duree.includes(searchDuree)) &&
        (searchPrix === '' || prix.includes(searchPrix)) &&
        (searchComission === '' || comission.includes(searchComission)));
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
