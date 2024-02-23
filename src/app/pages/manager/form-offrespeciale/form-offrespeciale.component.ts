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
  selector: 'app-form-offrespeciale',
  templateUrl: './form-offrespeciale.component.html',
  styleUrls: ['./form-offrespeciale.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, TablerIconsModule, MatCardModule, NgApexchartsModule, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, ReactiveFormsModule, AsyncPipe,],
})
export class FormOffrespecialeComponent {
  constructor(private router: Router) {
  }

  form = new FormGroup({
    date_heure_envoi: new FormControl('', [Validators.required]),
    service: new FormControl('', [Validators.required]),
    date_fin: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
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
