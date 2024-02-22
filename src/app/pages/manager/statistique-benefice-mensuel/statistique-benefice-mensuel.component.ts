import { Component } from '@angular/core';
import {NgApexchartsModule} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";

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

}
