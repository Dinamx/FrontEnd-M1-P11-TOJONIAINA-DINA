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
import {Student} from "../../../models/interfaces";
import {UpdateComponent} from "../liste-employe/update/update.component";
import {MatSelectModule} from "@angular/material/select";
import {StudentService} from "../../../services/controllers/student/student-service.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe, MatGridListModule, MatPaginatorModule,],
})
export class ListStudentComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  studentListResearch: Student[] | undefined;

  studentList: Student[] | undefined;

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource = new MatTableDataSource<any>(this.studentList);
      this.dataSource.paginator = this.paginator;
    }
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog , private studentService: StudentService,private router: Router)
  {
    this.searchForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
    });
    console.log(this.dataSource);
  }

  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;
    try {
      const studentList = await this.studentService.getList();
      this.studentListResearch = studentList;
      console.log('RECHERCHE + ' + this.studentListResearch)
      this.dataSource.data = studentList;
      console.log("DataSource"+this.dataSource.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des Etudiants :', error);
    } finally {
      this.isLoading = false;
      console.log('Chargement terminé'); // Pour vérifier
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayedColumns: string[] = ['firstName','lastName','address','actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  filterData(filterValue: any) {
    const filteredData = this.dataSource.data.filter(item => {
      const firstname = item.firstName.toLowerCase();
      const lastname = item.lastName.toLowerCase();
      const address = item.address.toLowerCase();

      const searchFirstName = filterValue.firstname.toLowerCase();
      const searchLastName = filterValue.lastname.toLowerCase();
      const searchAddress = filterValue.address.toLowerCase();


      return ((searchFirstName === '' || firstname.includes(searchFirstName)) && (searchLastName === '' || lastname.includes(searchLastName)) && (searchAddress === '' || address.includes(searchAddress)) );
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

  viewDetails(element: any) {
    this.router.navigate(['/show-student', element.id]);
  }
  
}
