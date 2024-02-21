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


export interface productsData {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  number: number;
}


const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    nom: 'Mark J. Freeman',
    prenom: 'Counter One',
    email: 'email',
    number: 53,
  },
  {
    id: 2,
    nom: 'assets/images/profile/user-2.jpg',
    prenom: 'Andrew McDownland',
    email: 'Project Manager',
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
  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
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


  // @ViewChild('chart') chart: ChartComponent = Object.create(null);


  displayedColumns: string[] = ['nom', 'prenom', 'email', 'psswd','numero' , 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  // dataSource = ELEMENT_DATA;



//  Advanced search




  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const nom = item.nom.toLowerCase();
      const prenom = item.prenom.toLowerCase();
      const email = item.email.toLowerCase();

      const searchNom = filterValue.nom.toLowerCase();
      const searchPrenom = filterValue.prenom.toLowerCase();
      const searchEmail = filterValue.email.toLowerCase();

      return (
        (searchNom === '' || nom.includes(searchNom)) &&
        (searchPrenom === '' || prenom.includes(searchPrenom)) &&
        (searchEmail === '' || email.includes(searchEmail))
        // Ajoutez d'autres conditions de filtrage si nécessaire
      );
    });
    this.dataSource.data = filteredData;
  }


  ismodif = false;
  isdelete = false;
  update(element  :any){
      this.ismodif = true;
  }

  delete(element  :any){
      this.isdelete = true;
  }









}
