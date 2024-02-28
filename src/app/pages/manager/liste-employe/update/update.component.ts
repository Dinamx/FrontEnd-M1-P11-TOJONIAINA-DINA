import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from '@angular/forms';
import {basicImportsModule} from "../../../../basicImports.module";
import {WebservicesService} from "../../../../services/webservice/webservices.service";
import axios from "axios";
import {url} from "../../../../app.component";


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule , basicImportsModule],
})
export class UpdateComponent {

  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private  webService : WebservicesService
  ) {
    console.log('DATA DANS UPADTE ')
    console.log(data)
    this.updateForm = this.fb.group({
      // nom: [data.nom, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [data.password, [Validators.required]],
      type_user: ['employe', Validators.required],
      // number: [data.number, [Validators.required]],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  onSubmit() {
    // this.updateForm.get('type_user')?.setValue('employe');
    if (this.updateForm.valid) {
      // Préparation des données pour la requête PUT
      const updateData = this.updateForm.value;
      // Envoi de la requête PUT
      axios.put(`${url}/login/update/${this.data._id}`, updateData)
        .then(() => {
          alert('Update effectué ')
          this.dialogRef.close(updateData); // Fermer la boîte de dialogue après la mise à jour et passer les données mises à jour
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la mise à jour du rendez-vous : ', error);
          alert('Une erreur s\'est produite lors de la mise à jour du rendez-vous.');
        });
    } else {
      alert('Veuillez remplir tous les champs requis');
    }
  }
}
