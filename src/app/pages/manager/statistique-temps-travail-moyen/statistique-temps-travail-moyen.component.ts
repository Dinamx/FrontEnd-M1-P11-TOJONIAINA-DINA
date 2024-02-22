import { Component, ViewChild } from "@angular/core";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexStroke,
  ApexFill
} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'app-statistique-temps-travail-moyen',
  templateUrl: './statistique-temps-travail-moyen.component.html',
  styleUrls: ['./statistique-temps-travail-moyen.component.scss'],
  standalone : true,
  imports : [
    NgApexchartsModule,
    basicImportsModule,
    MatSelectModule
  ]
})
export class StatistiqueTempsTravailMoyenComponent {
  @ViewChild(`chart`) chart: ChartComponent | undefined;
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9'], // Ajout des étiquettes
      chart: {
        type: "polarArea"
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

  }
}
