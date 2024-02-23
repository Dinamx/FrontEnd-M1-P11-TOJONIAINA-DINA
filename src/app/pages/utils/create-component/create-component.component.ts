import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.scss']
})
export class CreateComponentComponent implements OnInit {




  // Déclare une variable de type string
  titre: string = "offrespeciale";

  // Déclare un tableau à deux dimensions pour les attributs avec leurs types
  attributs: any[][] = [
    ['date_heure_envoi', 'string'],
    ['service', 'string'],
    ['date_fin', 'string'],
    ['description', 'string'],
    ['client', 'string'],
  ];

  // Chaîne résultante des attributs
  listeHtml: string = '';
  listeTs: string = '';
  formHtml: string = '';
  formTs : string = '';
  updateHtml : string = '';
  updateTs : string = '';





  constructor() { }

  ngOnInit(): void {
    // Initialisation
    console.log('Initialisation');

    // Appel de la fonction pour obtenir la chaîne résultante des attributs
    this.listeHtml = this.getRechercheAvancee() +`                             \n                ` + this.getListe();

    this.listeTs = this.getListeTs();


    this.formHtml = this.getFormHtml();

    this.formTs = this.getFormTs();

  }

  // Fonction pour obtenir la chaîne résultante des attributs
  getRechercheAvancee(): string {
    let retour = `
      <div class="col-lg-12">
        <mat-card class="mat-card cardWithShadow">
          <form [formGroup]="searchForm" (submit)="filterData(searchForm.value)">
            <mat-card-content class="mat-mdc-card-content">
              <div class="row justify-content-evenly" style="display: flex; align-items: center; justify-content: space-evenly">
    `;

    // Boucle à travers les attributs
    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `<div class="col-3 m-0 p-0">
  <mat-form-field appearance="outline" class="form-field-class col-12">
    <mat-label class="mat-label-class">${attributeName}</mat-label>
    <input formControlName="${attributeName}" class="mat-input-class" matInput placeholder="Entrez le ${attributeName}...">
  </mat-form-field>
</div><br>`;

    }

    retour += `
              <div class="col-sm-4 text-end d-flex align-items-center justify-content-end"> `
      + '<br>' +
      `
                <button mat-flat-button color="primary" class="add-contact-button-class col-12">
                  Rechercher
                </button>
              </div>
            </div>
          </mat-card-content>
          </form>
        </mat-card>
    `;

    return retour;
  }
  // Fonction pour obtenir la chaîne résultante des attributs
  getListe(): string {

    let retour = `                                                                       <mat-card class="cardWithShadow">
    <mat-card-content class="p-24">
      <mat-card-title>Take a new Appointment</mat-card-title>
      <div class="table-responsive m-t-16">
        <table mat-table [dataSource]="dataSource" class="w-100 table-borderless">`;

    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `<ng-container matColumnDef="${attributeName}">
            <th mat-header-cell *matHeaderCellDef class="f-w-600 mat-subtitle-1 f-s-14">
              ${attributeName}
            </th>
            <td mat-cell *matCellDef="let element ">
              <div class="d-flex align-items-center">
                <div class="m-l-16">
                  <span class="mat-body-1 f-s-14">
                      {{ element.${attributeName} }}
                    </span>
                </div>
              </div>
            </td>
          </ng-container>`;
    }

    retour += `<ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef class="f-w-600 mat-subtitle-1 f-s-14">
              action
            </th>
            <td style="display: flex ; align-items: center ; gap: 10px; " mat-cell *matCellDef="let element">
              <svg (click)="update(element)" xmlns="http://www.w3.org/2000/svg"
                   class="icon icon-tabler icon-tabler-edit-circle" width="24" height="24" viewBox="0 0 24 24"
                   stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z"/>
                <path d="M16 5l3 3"/>
                <path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6"/>
              </svg>
              <svg (click)="delete(element)" xmlns="http://www.w3.org/2000/svg"
                   class="icon icon-tabler icon-tabler-square-rounded-x-filled" width="24" height="24"
                   viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                   stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path
                  d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                  fill="currentColor" stroke-width="0"/>
              </svg>

            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        </table>


        <mat-paginator [length]="100"
                       [pageSize]="10"
                       [pageSizeOptions]="[5, 10, 25, 100]"
                       aria-label="Select page">
        </mat-paginator>


      </div>
    </mat-card-content>
  </mat-card>
</div>`;
    return retour;
  }



  getListeTs() : string {
    let retour = `import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
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
@Component({
  selector: 'app-liste-${this.titre}',
  templateUrl: './liste-${this.titre}.component.html',
  styleUrls: ['./liste-${this.titre}.component.scss'],
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
export class Liste${capitalizeFirstLetter(this.titre)}Component {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;


  searchForm: FormGroup;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  ngAfterViewInit() {
    if (this.paginator){

    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;


   }


  }
  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.searchForm = this.fb.group({
`;

    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `      ${attributeName}: [''],`;
    }
    retour += `});


    console.log(this.dataSource );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
    displayedColumns: string[] = [
    `;
    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `      '${attributeName}',`;
    }
      retour += `'action'];



        dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  filterData(filterValue: any) {
    const filteredData = ELEMENT_DATA.filter(item => {

`;
    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `          const ${attributeName} = item.${attributeName}.toLowerCase(); `;
    }

    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `          const search${capitalizeFirstLetter(attributeName)} = filterValue.${attributeName}.toLowerCase();      `;
    }

    retour += `      return (`;
    for (const attribut of this.attributs) {
      const attributeName = attribut[0];
      const attributeType = attribut[1];

      retour += `        (search${capitalizeFirstLetter(attributeName)} === '' || ${attributeName}.includes(search${capitalizeFirstLetter(attributeName)})) &&                `;
    }
    retour += `);
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
      }
    });
  }

  delete(element  :any){
      this.isdelete = true;
  }
}


`;




    return retour;
  }







// FORMULAIRE INSERTION
 getFormHtml() : string{
   let retour = `<mat-card class="cardWithShadow">
  <mat-card-content>
    <mat-card-title>${capitalizeFirstLetter(this.titre)}</mat-card-title>
    <mat-card-subtitle class="mat-body-1">New ${capitalizeFirstLetter(this.titre)}</mat-card-subtitle>
        <form [formGroup]="form" (ngSubmit)="submit()">
`;
   for (const attribut of this.attributs) {
     const attributeName = attribut[0];
     const attributeType = attribut[1];

     retour += `
      <mat-form-field appearance="outline" class="w-100" color="primary">
        <mat-label class="mat-subtitle-2 f-w-600 m-b-8 d-block" >${attributeName}</mat-label>
        <input matInput class="mat-input-element" formControlName="${attributeName}"  />
        <mat-error *ngIf="f.${attributeName}.invalid ">
          ${attributeName} invalid
        </mat-error>
      </mat-form-field>
             `;
   }

   retour += `
         <div appearance="outline" class="w-100" color="primary">
        <button type="submit"  mat-flat-button color="primary" class="w-50">
          Confirm
        </button>
      </div>
       </form>
  </mat-card-content>
</mat-card>
   `;

  return retour;
}

 getFormTs() : string{
  let retour = `

  import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
@Component({
  selector: 'app-form-${this.titre}',
  templateUrl: './form-${this.titre}.component.html',
  styleUrls: ['./form-${this.titre}.component.scss'],
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
    MatDatepickerModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class Form${capitalizeFirstLetter(this.titre)}Component {
  constructor(private router: Router) {}
  form = new FormGroup({


  `;
   for (const attribut of this.attributs) {
     const attributeName = attribut[0];
     const attributeType = attribut[1];

     retour += `
        ${attributeName}: new FormControl('', [Validators.required]),
             `;
   }
   retour += `
   });

     get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted successfully');
      console.log('Form value:', this.form.value);

      alert('Insertion dans service effectuée');
      this.router.navigate([self]);



    } else {
      alert('Erreur')
      console.log('Form submission failed');
    }
  }
}

   `;

  return retour;
}


  getUpdateHtml() : string{
    let retour = '';


    return retour;

  }

  getUpdateTs() : string{
    let retour = '';


    return retour;

  }




}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
