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
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss'],
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
export class FormServiceComponent {
  constructor(private router: Router) {}



  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(6)]),
    prix: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Prix positif
    duree: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]), // Nombre entier pour la durée
    commission: new FormControl('', [Validators.required, Validators.pattern(/^100(\.0{1,2})?$|^(\d{1,2}(\.\d{1,2})?)$/)]), // Pourcentage entre 0 et 100
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      console.log('Form submitted successfully');
      // Ajoutez ici la logique pour envoyer les données au serveur ou effectuer d'autres actions nécessaires
      this.router.navigate([self]);
    } else {
      console.log('Form submission failed');
    }
  }

  positiveNumberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  }

  isNumberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value)) {
      return { 'number': true };
    }
    return null;
  }

  percentageValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 100) {
      return { 'percentage': true };
    }
    return null;
  }
}




