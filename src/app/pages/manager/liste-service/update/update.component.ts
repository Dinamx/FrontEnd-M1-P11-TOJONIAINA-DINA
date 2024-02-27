import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from '@angular/forms';
import {basicImportsModule} from "../../../../basicImports.module";
import {WebservicesService} from "../../../../services/webservice/webservices.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, basicImportsModule],
})
export class UpdateComponent {
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private webService: WebservicesService) {
    this.updateForm = this.fb.group({
      service: [data.description, Validators.required],
      prix: [data.prix, Validators.required],
      duree: [data.duree, Validators.required],
      comission: [data.comission, Validators.required],
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.webService.updateData('', this.updateForm.value);
      this.data.updateList();
      this.dialogRef.close();
    } else {
      alert('Valeur fausse')
    }
  }
}
