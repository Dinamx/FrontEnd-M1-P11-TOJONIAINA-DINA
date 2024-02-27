import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {RendezVousServiceService} from "../../../../services/controllers/client/rendez-vous-service.service";
import {basicImportsModule} from "../../../../basicImports.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {Rendezvous} from "../../../../models/interfaces";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule , basicImportsModule]
})
export class UpdateComponent {

  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Utilise l'interface Rendezvous pour le type de données
    private rendezvousService: RendezVousServiceService // Assure-toi que ce service est disponible dans le module ou injecté  ici
  ) {
    this.updateForm = this.fb.group({
      date_heure: [data.date_heure, Validators.required],
      service: [data.service.description, Validators.required],
      client: [data.client.email, Validators.required],
      employe: [data.employe.email, Validators.required],
      prixpaye: [data.prixpaye, Validators.required],
      comissionemploye: [data.comissionemploye, Validators.required],
      duree: [data.duree, Validators.required],
      comission: [data.comission, Validators.required],
      etat_rdv: [data.etat_rdv, Validators.required],
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      // Ici, tu peux appeler une méthode de ton service pour mettre à jour le rendez-vous dans la base de données
      // Par exemple :
      // this.rendezvousService.updateRendezVous(this.updateForm.value).subscribe(() => {
      //   this.dialogRef.close(); // Fermer la boîte de dialogue après la mise à jour
      // });
      // Assure-toi que la méthode updateRendezVous existe dans ton service et gère correctement la mise à jour
    }
    else {
      alert('Veuillez remplir tous les champs requis');
    }
  }
}
