import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from "@angular/router";
import {CompteServiceService} from "../../../services/controllers/compte-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();




  nom: string | null;


  solde : string | '';

  soldeChiffre : number | '';


  showFiller = false;

  constructor(public dialog: MatDialog, private router: Router, private compteClientService: CompteServiceService) {
    this.soldeChiffre =  0;
    this.solde =  '';

    if (localStorage.getItem("email")) {
      this.nom = localStorage.getItem("email");
      const typeUser = localStorage.getItem("typeUser");

      if (typeUser === 'client') {
        try {
          if (localStorage.getItem("userId")) {
            // Utilisez await pour attendre que la promesse soit résolue
            this.compteClientService.getMontant(<string>localStorage.getItem("userId")).then(retour => {
              console.log(retour);
              // Vérifie si retour est une réponse Axios
              if ('data' in retour) {
                // Si c'est une réponse Axios, accède à retour.data.montant
                this.solde = 'Votre solde :' + retour.data.total + ' ar';
              } else {
                // Sinon, retour est un objet avec un champ montant directement
                this.solde = 'Votre solde :' + retour.montant + 'ar';
              }
            }).catch(error => {
              alert(error);
            });
          }
          else {

          }
        } catch (error) {
          alert(error)
        }
      } else {
        this.solde = '';
      }
    } else {
      this.solde = '0';
      this.nom = localStorage.getItem("nom");
      this.router.navigateByUrl('/');
    }
  }


  disconnect(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


}
