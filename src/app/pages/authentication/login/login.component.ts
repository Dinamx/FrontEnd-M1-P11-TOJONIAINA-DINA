import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import axios from "axios";
import {LoginServiceService} from "../../../services/controllers/login/login-service.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class AppSideLoginComponent implements OnInit {
  userType: string = '1';

  errorMessage!: string;
  form!: FormGroup;


  constructor(private route: ActivatedRoute, private router  : Router  ,private  loginService : LoginServiceService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['error'];
    });

    this.route.params.subscribe(params => {
      this.userType = params['userType'] || '1';
      this.initializeForm(); // Assure-toi que le formulaire est initialisé après avoir défini le type d'utilisateur
    });
  }

  initializeForm() {
    let userEmail = 'tojohajarisoa@gmail.com';
    let userPsswd = 'password';

    if (this.userType == '2') {
      userEmail = 'employe@employe.com';
      userPsswd = 'password';
    } else if (this.userType == '3') {
      userEmail = 'admin@admin.com';
      userPsswd = 'password';
    }

    this.form = new FormGroup({
      email: new FormControl(userEmail, [Validators.required, Validators.email]),
      password: new FormControl(userPsswd, [Validators.required, Validators.minLength(6)]),
    });
  }
  userEmail : string = '';
  userPsswd : string = '';






  getLoginHeaderText(): string {
    switch (this.userType) {
      case '1':
        return 'Log in as a Client';
      case '2':
        return 'Log in as Employe';
      case '3':
        return 'Log in as Admin';
      default:
        return 'Log in';
    }
  }



  redirect(typeUser: string) {
    let route: string;
    switch (typeUser) {
      case 'client':
        route = '/dashboard/rendezVous';
        break;
      case 'employe':
        route = '/dashboard/listeRendezVousEmp';
        break;
      case 'admin':
        route = '/dashboard/listeservice';
        break;
      default:
        route = '/'; // Route par défaut si le type d'utilisateur n'est pas reconnu
    }
    this.router.navigateByUrl(route);
  }

  getLink() {
    switch (this.userType) {
      case '1':
        return [{name:'Employe',value:'/authentication/login/2'},{name:'Admin',value:'/authentication/login/3'}];
      case '2':
        return [{name:'Client',value:'/authentication/login/1'},{name:'Admin',value:'/authentication/login/3'}];
      case '3':
        return [{name:'Client',value:'/authentication/login/1'},{name:'Employe',value:'/authentication/login/2'}];
      default:
        return [{name:'Employe',value:'/authentication/login/2'},{name:'Admin',value:'/authentication/login/3'}];
    }
  }

  isLoading = false;

  async logIn() {
    this.isLoading = true; // Active le spinner

    try {
      console.log(this.form.value);
      console.log('user + ' + this.userEmail);
      console.log('psswd + ' + this.userPsswd);

      // Attendre la résolution de la promesse
      const response = await this.loginService.logIn(this.form.value);
      if (response.status ===  200) {
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('typeUser', response.data.type_user);
        localStorage.setItem('email', response.data.email);

        console.log('typeUser' + localStorage.getItem('typeUser'));

        // Vérifier si localStorage.getItem('typeUser') n'est pas nul
        const typeUser = localStorage.getItem('typeUser');
        if (typeUser) {
          this.redirect(typeUser);
        } else {
          alert('Type d\'utilisateur incorrect.');
        }
      }
    } catch (error) {

      console.log('Erreur complète :', error);
      // Gérer les erreurs
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert('Une erreur inattendue est survenue.');
      }
    }
  }



}
