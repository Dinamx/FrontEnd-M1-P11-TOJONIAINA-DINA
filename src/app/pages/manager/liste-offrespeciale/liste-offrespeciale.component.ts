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
import {Offrespeciale} from "../../../models/interfaces";
import {UpdateComponent} from "../liste-employe/update/update.component";
import {MatSelectModule} from "@angular/material/select";
import {OffrespecialeService} from "../../../services/controllers/offrespeciale.service";


const ELEMENT_DATA: Offrespeciale[] = [
  {
    idclient: '1',
    contenu: 'Promotion',
    date_heure_envoi: '2024-02-23 09:00',
    mail_envoi: 'mail',
    pourcentage: '12',
    date_fin: '2024-03-15',
    idservice: '2',
  },
  {
    idclient: '2',
    contenu: 'Promotion',
    date_heure_envoi: '2024-02-23 09:00',
    mail_envoi: 'mail',
    pourcentage: '12',
    date_fin: '2024-03-15',
    idservice: '3',
  }
];




@Component({
  selector: 'app-liste-offrespeciale',
  templateUrl: './liste-offrespeciale.component.html',
  styleUrls: ['./liste-offrespeciale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListeOffrespecialeComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  offrespecialeListResearch: Offrespeciale[] | undefined;

  offrespecialeList: Offrespeciale[] | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource = new MatTableDataSource<any>(this.offrespecialeList);
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog , private offreSpecialesService: OffrespecialeService)
  {
    this.searchForm = this.fb.group({
      contenu: [''],
      date_heure_envoi: [''],
      mail_envoi: [''],
      pourcentage: [''],
      date_fin: [''],
    });
    console.log(this.dataSource);
  }

  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    try {
      const offrespecialeList = await this.offreSpecialesService.getOffreList();
      this.offrespecialeListResearch = offrespecialeList;
      console.log('RECHERCHE + ' + this.offrespecialeListResearch)
      this.dataSource.data = offrespecialeList;
      console.log("DataSource"+this.dataSource.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des offres sepeciales :', error);
    } finally {
      this.isLoading = false;
      console.log('Chargement terminé'); // Pour vérifier
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['idclient','idservice','contenu', 'pourcentage', 'mail_envoi', 'date_heure_envoi' , 'date_fin' , 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {
      const date_heure_envoi = item.date_heure_envoi.toLowerCase();
      const date_fin = item.date_fin.toLowerCase();
      const description = item.contenu.toLowerCase();
      const client = item.idclient.toLowerCase();

      const searchDate_heure_envoi = filterValue.date_heure_envoi.toLowerCase();
      const searchDate_fin = filterValue.date_fin.toLowerCase();
      const searchDescription = filterValue.description.toLowerCase();
      

      return ((searchDate_heure_envoi === '' || date_heure_envoi.includes(searchDate_heure_envoi)) && (searchDate_fin === '' || date_fin.includes(searchDate_fin)) && (searchDescription === '' || description.includes(searchDescription)) );
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
