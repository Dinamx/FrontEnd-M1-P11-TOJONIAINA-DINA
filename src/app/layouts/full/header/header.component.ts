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

  solde : string | '';

  soldeChiffre : number | '';

  showFiller = false;
  image: string | '/assets/images/profile/profile.png';

  constructor(public dialog: MatDialog, private router: Router, private compteClientService: CompteServiceService) {
    this.soldeChiffre =  0;
    this.solde =  '';
    this.image = '/assets/images/profile/profile.png'; 
  }

  disconnect(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


  monProfil() {
      this.router.navigateByUrl('/dashboard/modifierProfil');

  }
}
