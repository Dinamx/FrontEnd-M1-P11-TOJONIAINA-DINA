import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import {CompteServiceService} from "../../../services/controllers/compte-service.service";

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
export class FormCompteComponent implements OnInit {
  form = new FormGroup({
    montant: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Utilisation de la méthode de la classe
    idClient: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private compteClientService: CompteServiceService , private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.form.get('idClient')?.setValue(userId);
    }
  }


  get f() {
    return this.form.controls;
  }

  // Déplacement de la fonction de validation à l'intérieur de la classe
  positiveNumberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  }


  async submit() {
    console.log('Form value:', this.form.value);
    if (this.form.valid) {
      console.log('Form  successfully' +  this.form.value);
      try {
        const response = await this.compteClientService.insertCompte(this.form.value);
        console.log('Insertion réussie :', response);
        this.cd.detectChanges();
        alert('Votre compte a été crédité');
        location.reload();
      //  Recharger la page
      } catch (error) {
        console.error('Erreur lors de l\'insertion :', error);
        alert('Erreur lors de l\'insertion' + error);
      }
    } else {
      alert('Erreur')
      console.log('Form submission failed');
    }
  }

}
