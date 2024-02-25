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
import {MatRadioModule} from "@angular/material/radio";
import {FileHandle} from "../../../services/dragDrop.directive";

@Component({
  selector: 'app-form-employe',
  templateUrl: './form-employe.component.html',
  styleUrls: ['./form-employe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule,
    MatRadioModule,
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
    AsyncPipe]
})
export class FormEmployeComponent {
  constructor(private router: Router) {
  }


  selectedServices: string[] = [];


  form = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  // files: FileHandle[] = [];

  // filesDropped(files: FileHandle[]): void {
  //   this.files = files;
  // }



  // onFileSelected(event: Event & { target: HTMLInputElement }) {
  //   const files = event.target.files;
  //   if (files && files.length >  0) {
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       // e.target.result contient le contenu en base64 de l'image
  //       console.log(e.target.result);
  //       // Ici, tu peux stocker le contenu en base64 dans une variable ou le traiter comme nécessaire
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onFileSelected(event: Event | File) {
  //   let file: File | null = null;
  //   if (event instanceof Event) {
  //     const input = event.target as HTMLInputElement;
  //     if (input.files && input.files.length >  0) {
  //       file = input.files[0];
  //     }
  //   } else {
  //     file = event;
  //   }
  //   if (file) {
  //     console.log(file);
  //     // Traitez le fichier sélectionné   ici
  //   } else {
  //     console.log('Aucun fichier sélectionné');
  //   }
  // }

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string ;
      console.log(base64String);
    };
    if (file){
      reader.readAsDataURL(file);
    }
  }
}
