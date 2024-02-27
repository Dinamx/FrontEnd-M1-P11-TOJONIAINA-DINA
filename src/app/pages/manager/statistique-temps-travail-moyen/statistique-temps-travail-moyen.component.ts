import { Component, ViewChild } from "@angular/core";
import {NgApexchartsModule} from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";
import {ConstantsService} from "../../../services/const/constants.service";

export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
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
  public chartOptions: Partial<ChartOptions> ;
  months = this.constService.months;

  constructor(private constService : ConstantsService) {
    this.chartOptions = {
      series: [
        {
          name: "basic",
          data: [400,  430,  448,  470,  540,  580,  690,  1100,  1200,  1380]
        }
      ],
      chart: {
        type: "bar",
        height:  350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "South Korea",
          "Canada",
          "United Kingdom",
          "Netherlands",
          "Italy",
          "France",
          "Japan",
          "United States",
          "China",
          "Germany"
        ]
      }
    };
  }
}
