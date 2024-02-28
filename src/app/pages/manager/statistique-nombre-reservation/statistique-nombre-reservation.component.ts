import { Component, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";

import { basicImportsModule } from "../../../basicImports.module";
import { MatSelectModule } from "@angular/material/select";
import { ConstantsService } from "../../../services/const/constants.service";
import { ReservationService } from "../../../services/controllers/statistiques/reservation.service";
import { ReservationData } from "../../../models/interfaces";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-statistique-nombre-reservation',
  templateUrl: './statistique-nombre-reservation.component.html',
  styleUrls: ['./statistique-nombre-reservation.component.scss'],
  standalone: true,
  imports: [
    basicImportsModule,
    MatSelectModule
  ]
})
export class StatistiqueNombreReservationComponent {

  months = this.constService.months;
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: ChartOptions | undefined;

  constructor(public constService: ConstantsService, private reservationService: ReservationService) {
    (async () => {
      const categories = await this.generateCategories();
      
      this.chartOptions = {
        series: [
          {
            name: "Nombre de reservation",
            data: []
          }
        ],
        chart: {
          height: 350,
          width: 1500,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: categories,
          position: "top",
          labels: {
            offsetY: -18
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5
              }
            }
          },
          tooltip: {
            enabled: true,
            offsetY: -35
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            show: false
          }
        },
        title: {
          text: "Statistiques nombre de reservation",
          floating: false,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444"
          }
        }
      };
    })();
  }

  ngOnInit() {
    this.updateDataFromResponse();
  } 

  async updateDataFromResponse() {
    try {
      const response = await this.reservationService.getNombreReservation();
      console.log(response);
      
      if (this.chartOptions && this.chartOptions.series) {
        this.chartOptions.series[0].data = response.map((item: ReservationData) => item.reservations);
      } else {
        console.error('Erreur : this.chartOptions ou this.chartOptions.series est undefined.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du Nb reservation :', error);
    }
  }
  
  
  private async generateCategories(): Promise<string[]> {
    const response = await this.reservationService.getNombreReservation();
    return response.map((item: ReservationData) => item.date);
  }
}
