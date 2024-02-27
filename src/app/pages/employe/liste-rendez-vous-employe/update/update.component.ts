import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {RendezVousServiceService} from "../../../../services/controllers/client/rendez-vous-service.service";
import {basicImportsModule} from "../../../../basicImports.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {Rendezvous} from "../../../../models/interfaces";
import axios from "axios";
import {url} from "../../../../app.component";

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


    console.log(data);


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


    // Mise à jour de la commission automatiquement lorsque le prix est modifié
    this.updateForm.get('prixpaye')?.valueChanges.subscribe(prix => {
      const comission = this.calculateComission(prix , this.data.comission); // Assure-toi d'avoir une méthode pour calculer la commission
      this.updateForm.get('comissionemploye')?.setValue(comission);
    });





  }

  calculateComission(prix: number , taux : number): number {
    // Exemple de calcul : commission = prix *  0.1
    return prix *  taux / 100;
  }

// Dans UpdateComponent
  onSubmit() {
    if (this.updateForm.valid) {
      // Mise à jour de l'état du rendez-vous
      this.updateForm.get('etat_rdv')?.setValue(1);
      this.updateForm.get('service')?.setValue(this.data.service._id);
      this.updateForm.get('employe')?.setValue(localStorage.getItem('userId'));
      this.updateForm.get('client')?.setValue(this.data.client._id);

      // Préparation des données pour la requête PUT
      const updateData = this.updateForm.value;

      // Envoi de la requête PUT
      axios.put(`${url}/employes/update_rdv/${this.data._id}`, updateData)
        .then(() => {
          alert('Validation du Rendez-vous ')
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
