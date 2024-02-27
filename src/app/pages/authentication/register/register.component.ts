import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {WebservicesService} from "../../../services/webservice/webservices.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router ,private webService : WebservicesService) {}

  form = new FormGroup({
    // uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]), // Ajout de la validation email
    password: new FormControl('', [Validators.required, Validators.minLength(4)]), // Modification de la validation du mot de passe
    type_user: new FormControl('client', Validators.required), // Modification de la validation du mot de passe
  });

  get f() {
    return this.form.controls;
  }

  signUp(){
    if (this.form.valid) { // Vérification si le formulaire est valide
      console.log('Sign up');
      console.log(this.form);
      const retour = this.webService.insertDataRetour(this.form.value , '/login/signup');
      alert('Compte Enregistré');
      this.router.navigateByUrl('');
      // Vous pouvez ajouter ici la logique pour envoyer les données au serveur ou autre traitement nécessaire
    } else {

      // Gérer le cas où le formulaire n'est pas valide, par exemple afficher des messages d'erreur
      console.log('Invalid form');
    }
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }
}
