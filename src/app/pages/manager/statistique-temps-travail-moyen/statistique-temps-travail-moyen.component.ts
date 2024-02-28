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
import { TempsmoyenService } from "../../../services/controllers/statistiques/tempsmoyen.service";
import { TempsmoyenData } from "../../../models/interfaces";


export type ChartOptions = {
  series?: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-statistique-temps-travail-moyen',
  templateUrl:'./statistique-temps-travail-moyen.component.html',
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
  public chartOptions: Partial<ChartOptions>| undefined;
  months = this.constService.months;
  isLoading: boolean = true;

  constructor(private constService : ConstantsService,private tempsmoyenService: TempsmoyenService)
  {}

  async ngOnInit() {
    try {
     this.isLoading  = true;
    const temps = await this.updateDataFromResponse();
    this.initializeChartAsync(temps);

    }
    catch (e) {
      alert(e);
    }
    finally {
      this.isLoading  = false;
    }


  }

  async onMonthSelectionChange(event: any) {
    try {
      this.isLoading = true;
      const mois = event.value;
      const temps = await this.updateSearchDataFromResponse(mois);
      // Logic for month selection change
      this.initializeChartAsync(temps);
    }
    catch (e) {
      alert(e);
    }
    finally {
      this.isLoading = false;

    }
  }

  private async initializeChartAsync(temps: number[]): Promise<void> {
    const categories = await this.generateCategories();
    this.chartOptions = {
      series: [
        {
          name: "Temps moyen de travail (en minutes)",
          data: temps
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
        categories: categories
      }
    };

  }

  private async updateDataFromResponse(): Promise<number[]> {
    const response = await this.tempsmoyenService.getTempsMoyenEmploye();
    return response.map((item: TempsmoyenData) => item.temps);
  }

  private async generateCategories(): Promise<string[]> {
    const response = await this.tempsmoyenService.getTempsMoyenEmploye();
    return response.map((item: TempsmoyenData) => item.nom);
  }

  private async updateSearchDataFromResponse(mois:number): Promise<number[]> {
    const response = await this.tempsmoyenService.getSearchTempsMoyenEmploye(mois);
    return response.map((item: TempsmoyenData) => item.temps);
  }
}
