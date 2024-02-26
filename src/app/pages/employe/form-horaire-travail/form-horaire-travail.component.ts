import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HoraireServiceService } from '../../../services/controllers/employe/horaire-service.service';
import {basicImportsModule} from "../../../basicImports.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-form-horaire-travail',
  templateUrl: './form-horaire-travail.component.html',
  styleUrls: ['./form-horaire-travail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    basicImportsModule,
    MatProgressSpinnerModule
  ],
})
export class FormHoraireTravailComponent implements OnInit {

  form = new FormGroup({
    idEmploye: new FormControl('', [Validators.required]), // Ajout du champ idEmploye
    heureDebut: new FormControl('', [Validators.required]),
    heureFin: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private horaireService: HoraireServiceService) {}

  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true;
    // Récupérer l'ID de l'employé à partir de localStorage ou d'une autre source
    const idEmploye = localStorage.getItem('userId');
    if (idEmploye) {
      this.horaireService.getHorairesEmploye(idEmploye).then(horaires => {
        this.form.setValue({
          idEmploye: idEmploye,
          heureDebut: horaires.heureDebut || '08:00',
          heureFin: horaires.heureFin || '17:00'
        });
      }).catch(error => {
        console.error('Erreur lors de la récupération des horaires de l\'employé :', error);
        // Gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
      }).finally(() => {
        this.isLoading = false;
        console.log('Chargement terminé'); // Pour vérifier
      });
    }
  }

  submit() {
    if (this.form.valid) {
      this.horaireService.updateHoraireEmploye(this.form.value).then(response => {
        alert('Horaires mis à jour avec succès');
        // Rediriger l'utilisateur ou afficher un message de succès
      }).catch(error => {
        console.error('Erreur lors de la mise à jour des horaires :', error);
        // Afficher un message d'erreur
      });
    } else {
      console.log('Le formulaire est invalide');
      // Afficher un message d'erreur
    }
  }
}
