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
  selector: 'app-form-employe',
  templateUrl: './form-employe.component.html',
  styleUrls: ['./form-employe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, ReactiveFormsModule, AsyncPipe,],
})
export class FormEmployeComponent {
  constructor(private router: Router) {
  }

  form = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
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
