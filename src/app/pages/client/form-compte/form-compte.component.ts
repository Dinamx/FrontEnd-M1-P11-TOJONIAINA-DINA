import {Component, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Router} from "@angular/router";
import {basicImportsModule} from "../../../basicImports.module";

@Component({
  selector: 'app-form-compte',
  templateUrl: './form-compte.component.html',
  styleUrls: ['./form-compte.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    basicImportsModule
  ],
})
export class FormCompteComponent {
  constructor(private router: Router) {}
  form = new FormGroup({
    montant: new FormControl('', [Validators.required]),
  });


}
