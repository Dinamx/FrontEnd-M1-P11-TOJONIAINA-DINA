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
import {UpdateComponent} from "./update/update.component";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";
import {Service} from "../../../models/interfaces";
import {ServicesService} from "../../../services/controllers/services.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";



const ELEMENT_DATA: Service[] = [
  {
    id: 'service1',
    description: 'Description du description  1',
    prix: 100,
    duree: '1 heure',
    comission: 10,
    image: '10'
  },
  {
    id: 'description2',
    description: 'Description du service  2',
    prix: 200,
    duree: '2 heures',
    comission: 20,
    image: '10'

  }
];




@Component({
  selector: 'app-liste-service',
  templateUrl: './liste-service.component.html',
  styleUrls: ['./liste-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,MatSelectModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeServiceComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;



  servicesListResearch: Service[] | undefined;
  servicesList: Service[] | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource = new MatTableDataSource<any>(this.servicesList);
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog , private servicesService: ServicesService) {
    this.searchForm = this.fb.group(
      {
        description: [''],
        duree: [''],
        prix: [''],
        comission: [''],});
    console.log(this.dataSource);
  }

  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    try {
      const servicesList = await this.servicesService.getServicesList();
      console.log('Services list:', servicesList);

      this.servicesListResearch = servicesList;
      console.log('RECHERCHE + ' + this.servicesListResearch)
      this.dataSource.data = servicesList;


    //  Service barre recherche


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

  displayedColumns: string[] = [ 'description', 'duree', 'prix', 'comission', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();


  filterData(filterValue: any) {
    const filteredData = this.dataSource.data.filter(item => {
      const description = item.description.toLowerCase();
      const duree = item.duree.toString().toLowerCase();
      const prix = item.prix.toString().toLowerCase();
      const comission = item.comission.toString().toLowerCase();
      const searchDescription = filterValue.description.toLowerCase();
      const searchDuree = filterValue.duree.toLowerCase();
      const searchPrix = filterValue.prix.toLowerCase();
      const searchComission = filterValue.comission.toLowerCase();
      return (
        (searchDescription === '' || description.includes(searchDescription)) &&
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
    dialogRef.afterClosed().subscribe(async result => {
      try {
        const servicesList = await this.servicesService.getServicesList();
        this.ismodif = false;
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    });
  }

  delete(element: any) {
    this.isdelete = true;
  }
}
