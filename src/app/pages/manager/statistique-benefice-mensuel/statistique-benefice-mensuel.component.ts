import {Component} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexMarkers,
  ApexPlotOptions, ApexResponsive, ApexStroke, ApexTooltip, ApexXAxis,
  ApexYAxis,
  NgApexchartsModule
} from "ng-apexcharts";
import {basicImportsModule} from "../../../basicImports.module";
import {MatSelectModule} from "@angular/material/select";
import {ConstantsService} from "../../../services/const/constants.service";
import {GlobalService} from "../../../services/controllers/statistiques/global.service";
import {TablerIconComponent, TablerIconsModule} from "angular-tabler-icons";
import axios from "axios";
import {url} from "../../../app.component";


export interface profitExpanceChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  marker: ApexMarkers;
}

export interface trafficChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}

export interface salesChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  responsive: ApexResponsive;
}
@Component({
  selector: 'app-statistique-benefice-mensuel',
  templateUrl: './statistique-benefice-mensuel.component.html',
  styleUrls: ['./statistique-benefice-mensuel.component.scss'],
  standalone: true,
  imports: [
    NgApexchartsModule,
    basicImportsModule,
    MatSelectModule,
    TablerIconsModule
  ]
})
export class StatistiqueBeneficeMensuelComponent {

  public profitExpanceChart!: Partial<profitExpanceChart> | any;
  public trafficChart!: Partial<trafficChart> | any;
  public salesChart!: Partial<salesChart> | any;




  isLoading: boolean = true;
  months = this.constService.months;
  benefice: any;
  chiffre_affaire: any;
  depense: any;

  constructor(public constService: ConstantsService, private globalService: GlobalService) {

  }

  async ngOnInit() {


    await this.updateData();

















  }

  async onMonthSelectionChange(event: any) {
    try {
      this.isLoading = true;
      const mois = event.value;
      const annee = 2024;
      const benefice = await this.globalService.getSearchBenefice(mois, annee);
      const chiffre = await this.globalService.getSearchChiffre(mois, annee);
      this.benefice = benefice;
      this.chiffre_affaire = chiffre;
      this.depense = this.chiffre_affaire - this.benefice;
      await this.getDepenses(mois, String(annee));

    } catch(e) {
      alert(e);
    } finally {
      this.isLoading = false;

    }

  }

  async updateData() {
    try {
      this.isLoading = true;
      const benefice = await this.globalService.getBenefice();
      const chiffre = await this.globalService.getChiffre();
      this.benefice = benefice;
      this.chiffre_affaire = chiffre;
      this.depense = this.chiffre_affaire - this.benefice;






      this.trafficChart = {
        series: [this.benefice, this.depense, this.chiffre_affaire],
        labels: ['Benefice : ' + this.benefice.toLocaleString() + ' ar', 'Depense : ' + this.depense.toLocaleString()+ ' ar', 'Chiffre d\'affaire : ' + this.chiffre_affaire.toLocaleString() + ' ar'],
        chart: {
          type: 'donut',
          fontFamily: "'Plus Jakarta Sans', sans-serif;",
          foreColor: '#adb0bb',
          toolbar: {
            show: false,
          },
          height: 160,
        },
        // colors: ['#e7ecf0', '#fb977d', '#0085db'],
        colors: ['#20bf6b', '#c0392b', '#2c3e50'],
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              background: 'none',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '12px',
                  color: undefined,
                  offsetY: 5,
                },
                value: {
                  show: false,
                  color: '#98aab4',
                },
              },
            },
          },
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        responsive: [
          {
            breakpoint: 991,
            options: {
              chart: {
                width: 120,
              },
            },
          },
        ],
        tooltip: {
          enabled: false,
        },
      };






















    } catch (e) {
      alert(e);
    } finally {
      this.isLoading = false;
    }
  }

  async getDepenses(mois: string, annee: string) {
    try {
      const response = await axios.get(`${url}/depenses/${mois}/${annee}`);
      this.listeDepense = response.data; // Assure-toi que la réponse contient les données attendues
      console.log(this.listeDepense);
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des dépenses:', error);
    }
  }
  //C'est angular get la liste des depense maintenant

  listeDepense: any = [];
  newDepense: string = ''; // Ajout d'une propriété pour le nouveau client
  description: string = '';
  addNewDepense() {
    // Convertir newDepense en nombre et vérifier si la conversion est réussie
    const depenseNumber = parseFloat(this.newDepense);
    if (!isNaN(depenseNumber)) {
      const depenseData = {
        description: this.description,
        prix: depenseNumber,
        date_heure: new Date().toISOString() // Utiliser la date d'aujourd'hui
      };

      // Envoyer la requête POST
      axios.post(`${url}/depenses/add`, depenseData)
        .then(response => {
          console.log('sended ' + depenseData )
          console.log('response add data ' + response )
          // Si la requête est réussie, ajouter la nouvelle dépense à listeDepense
          this.listeDepense.push(depenseData);
          this.newDepense = ''; // Réinitialiser le champ de saisie
          console.log(response.data.message); // Afficher le message de réussite
        })
        .catch(error => {
          // Gérer l'erreur si la requête échoue
          console.error('Une erreur est survenue lors de l\'ajout de la dépense:', error);
        });

    } else {
      // Gérer le cas où la conversion échoue (par exemple, afficher un message d'erreur)
      console.error('La valeur entrée n\'est pas un nombre valide.');
    }
  }
}
