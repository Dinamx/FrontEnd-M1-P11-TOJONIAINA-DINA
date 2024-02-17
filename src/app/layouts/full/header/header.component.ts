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

  showFiller = false;

  constructor(public dialog: MatDialog , private router  : Router) {
    if (!localStorage.getItem("nom")){
      this.nom = 'Sample';
    }
    else {
      this.nom = localStorage.getItem("nom");
      this.router.navigateByUrl('/');
    }
  }

  disconnect(){
    localStorage.clear();


  }


}
