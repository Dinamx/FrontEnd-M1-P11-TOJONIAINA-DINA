import { Component } from '@angular/core';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {basicImportsModule} from "../../../basicImports.module";

@Component({
  selector: 'app-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss'],
  standalone : true,
  imports: [
    // Autres imports
    MatCheckboxModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule , basicImportsModule
  ],

})
export class LandingPagesComponent {

  constructor() { }

  ngOnInit(): void {
  }
}
