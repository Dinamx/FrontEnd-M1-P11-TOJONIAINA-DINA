import { Component } from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-statistique-chiffre-d-affaire',
  templateUrl: './statistique-chiffre-d-affaire.component.html',
  styleUrls: ['./statistique-chiffre-d-affaire.component.scss'],
  standalone : true,
  imports : [
    NgApexchartsModule,
    basicImportsModule,
    MatSelectModule
  ]
})
export class StatistiqueChiffreDAffaireComponent {

}
