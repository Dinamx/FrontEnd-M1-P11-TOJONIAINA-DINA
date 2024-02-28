import { Component } from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";
import {ConstantsService} from "../../../services/const/constants.service";
import {GlobalService} from "../../../services/controllers/statistiques/global.service";


@Component({
  selector: 'app-statistique-benefice-mensuel',
  templateUrl: './statistique-benefice-mensuel.component.html',
  styleUrls: ['./statistique-benefice-mensuel.component.scss'],
  standalone : true,
  imports : [
    NgApexchartsModule,
    basicImportsModule,
    MatSelectModule
  ]
})
export class StatistiqueBeneficeMensuelComponent {
  months = this.constService.months;
  benefice : any;
  chiffre_affaire : any;
  depense : any;
  constructor(public constService: ConstantsService,private globalService: GlobalService) {
  }

  async ngOnInit() {
    await this.updateData();
}

async onMonthSelectionChange(event: any) {
    const mois = event.value;
    const annee = 2024;
    const benefice = await this.globalService.getSearchBenefice(mois, annee);
    const chiffre = await this.globalService.getSearchChiffre(mois, annee);
    this.benefice = benefice;
    this.chiffre_affaire = chiffre;
    this.depense = this.chiffre_affaire - this.benefice;
}

async updateData() {
    const benefice = await this.globalService.getBenefice();
    const chiffre = await this.globalService.getChiffre();
    this.benefice = benefice;
    this.chiffre_affaire = chiffre;
    this.depense = this.chiffre_affaire - this.benefice;
}

}
