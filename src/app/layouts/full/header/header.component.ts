import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from "@angular/router";

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


  solde : string | null;

  soldeChiffre : number | '';


  showFiller = false;

  constructor(public dialog: MatDialog , private router  : Router) {
    // Acces base solde client

    this.soldeChiffre = 0;

    if (!localStorage.getItem("nom")){
      this.nom = 'Nom Fictif';
      this.solde = 'Votre solde :' + this.soldeChiffre  + 'ar';
    }
    else {
      this.solde = '0';
      this.nom = localStorage.getItem("nom");
      this.router.navigateByUrl('/');
    }
  }

  disconnect(){
    localStorage.clear();


  }


}
