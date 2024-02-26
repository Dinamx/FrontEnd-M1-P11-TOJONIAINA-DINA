import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {basicImportsModule} from "../../../basicImports.module";
import {HoraireServiceService} from "../../../services/controllers/employe/horaire-service.service";
import {WebservicesService} from "../../../services/webservice/webservices.service";

@Component({
  selector: 'app-form-horaire-travail',
  templateUrl: './form-horaire-travail.component.html',
  styleUrls: ['./form-horaire-travail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    basicImportsModule
  ],
})
export class FormHoraireTravailComponent {

  constructor(private router: Router , private horaireService : HoraireServiceService , private webservicesService: WebservicesService) {}

  ngOnInit() {
    this.horaireService.getHorairesEmploye().then(horaires => {
      this.form.setValue({
        datedebut: horaires.datedebut || '08:00',
        datefin: horaires.datefin || '17:00'
      });
    });
  }


  form = new FormGroup({
    datedebut: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
  });

  async updateHoraires() {
    try {
      const horaires = this.form.value;
      await this.webservicesService.updateData('/employe/horaires', horaires);
      console.log('Horaires mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des horaires :', error);
      throw error;
    }
  }

}
