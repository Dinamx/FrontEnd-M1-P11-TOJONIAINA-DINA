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
import {WebservicesService} from "../../../services/webservice/webservices.service";
import {Employe} from "../../../models/interfaces";





const ELEMENT_DATA: Employe[] = [
  {
    id: 1,
    nom: 'Mark J. ',
    prenom: 'Freeman',
    email: 'mark@gmail.com',
    number: 3202,
  },
  {
    id: 2,
    nom: 'Andrew',
    prenom: 'McDownland',
    email: 'andre@gmail.com',
    number: 150,
  }
];



@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.scss'],
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
    ReactiveFormsModule,
    AsyncPipe,
    MatGridListModule,
    MatPaginatorModule,
  ],
})
export class ListeEmployeComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;


  searchForm: FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ngAfterViewInit() {
    if (this.paginator){

    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;


      // this.searchForm.valueChanges.subscribe(val => {
      //   this.filterData(val);
      // });

    }


  }
  constructor(private fb: FormBuilder, private dialog: MatDialog , private webService: WebservicesService) {
    this.searchForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      number: [''],
    });


    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

    console.log(this.dataSource );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // displayedColumns: string[] = [
  //   'nom',
  //   'prenom', 'email', 'number' ,
  //   'action'];

  displayedColumns: string[] = [
    'prenom', 'email',
    'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  // dataSource = ELEMENT_DATA;



//  Advanced search




  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const nom = item.nom.toLowerCase();
      const prenom = item.prenom.toLowerCase();
      const email = item.email.toLowerCase();
      // const number = item.number.toString().toLowerCase(); // Convertir le numéro en chaîne pour le filtrage
      const number = item.number ? item.number.toString().toLowerCase() : '';


      const searchNom = filterValue.nom.toLowerCase();
      const searchPrenom = filterValue.prenom.toLowerCase();
      const searchEmail = filterValue.email.toLowerCase();
      // const searchNumber = filterValue.number.toString().toLowerCase(); // Convertir le numéro de recherche en chaîne
      const searchNumber = filterValue.number ? filterValue.number.toString().toLowerCase() : '';


      return (
        (searchNom === '' || nom.includes(searchNom)) &&
        (searchPrenom === '' || prenom.includes(searchPrenom)) &&
        (searchEmail === '' || email.includes(searchEmail)) &&
        (searchNumber === '' || number.includes(searchNumber)) // Ajout de la condition de filtrage pour le numéro
      );
    });
    this.dataSource.data = filteredData;
  }


  ismodif = false;
  isdelete = false;

  update(element: any) {
    this.ismodif = true;
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mettez à jour l'élément avec les nouvelles données
        // Vous pouvez utiliser le résultat pour mettre à jour votre source de données
      }
    });
  }

  updateList() {
    this.webService.getData('/service').then(data => {
      this.dataSource.data = data; // Mettez à jour votre source de données avec les nouvelles données
    }).catch(error => {
      console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    });
  }
  delete(element  :any){
      this.isdelete = true;
  }









}
