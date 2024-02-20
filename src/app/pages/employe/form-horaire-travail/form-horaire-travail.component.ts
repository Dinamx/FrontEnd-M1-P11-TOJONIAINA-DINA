import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {basicImportsModule} from "../../../basicImports.module";

@Component({
  selector: 'app-form-horaire-travail',
  templateUrl: './form-horaire-travail.component.html',
  styleUrls: ['./form-horaire-travail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    basicImportsModule
  ],
})
export class FormHoraireTravailComponent {

  constructor(private router: Router) {}

  form = new FormGroup({
    datedebut: new FormControl('', [Validators.required]),
    datefin: new FormControl('', [Validators.required]),
  });

}
