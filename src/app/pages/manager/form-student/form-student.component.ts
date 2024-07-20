import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators , FormArray } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { StudentService } from "../../../services/controllers/student/student-service.service";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { TablerIconsModule } from "angular-tabler-icons";
import { MatCardModule } from "@angular/material/card";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
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
    MatDialogModule,
    AsyncPipe
  ]
})
export class FormStudentComponent {
  successMessage: string | null = null;
  genders = ['M', 'F'];

  form = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    placeOfBirth: new FormControl(''),
    nationalIdentity: new FormControl(''),
    phoneNumber1: new FormControl(''),
    phoneNumber2: new FormControl(''),
    isSpecialStudent: new FormControl(),
    payments: new FormArray([
      new FormGroup({
        id: new FormControl(''),
        date: new FormControl(new Date().toISOString()),
        amount: new FormControl(),
        packageCategory: new FormControl('A'),
        packageName: new FormControl('Pack moto scooter')
      })
    ]),
    remaining: new FormControl(0)
  });

    get payments(): FormArray {
    return this.form.get('payments') as FormArray;
  }
  getPaymentControl(controlName: string): FormControl {
    return (this.form.get('payments') as FormArray).at(0).get(controlName) as FormControl;
  }
  

  constructor(private router: Router, private dialog: MatDialog, private studentService: StudentService) {
    this.form.get('id')?.valueChanges.subscribe(value => {
      const paymentGroup = this.payments.at(0) as FormGroup;
      paymentGroup.get('id')?.setValue(value);
    });
  }


  async submit() {
    console.log('Form value:', this.form.value);
    try {
      const response = await this.studentService.insert(this.form.value);
      
      const status = response.data.status;

      if(status === "200")
      {
        alert('Etudiant bien inscrit');
      }

    } catch (error) {
      console.error('Erreur lors de l\'insertion :', error);
      alert('Erreur lors de l\'insertion');
    }
  }
}