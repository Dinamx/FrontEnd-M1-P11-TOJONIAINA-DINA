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

  async ngOnInit() 
  {
    this.benefice = await this.globalService.getBenefice();
    this.chiffre_affaire = await this.globalService.getChiffre();
    this.depense = this.chiffre_affaire - this.benefice;
  }   
}
