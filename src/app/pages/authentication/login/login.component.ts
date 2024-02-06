import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import axios from "axios";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  userType: string = '1';


  constructor(private route: ActivatedRoute, private router  : Router ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userType = params['userType'] || '1';


      if (this.userType == '2'){
        this.userEmail= 'emp';
        this.userPsswd= 'emp';
      }
      else if (this.userType == '3'){
        this.userEmail= 'admin';
        this.userPsswd= 'admin';
      }
      else {
        this.userEmail= 'client';
        this.userPsswd= 'client';
      }

      console.log('this.useremail' + this.userEmail)

    });
  }
  userEmail : string = '';
  userPsswd : string = '';






  getLoginHeaderText(): string {
    switch (this.userType) {
      case '1':
        return 'Log in as Client';
      case '2':
        return 'Log in as Employe';
      case '3':
        return 'Log in as Admin';
      default:
        return 'Log in';
    }
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


  async logIn(){
    console.log('user + ' + this.userEmail);
    console.log('psswd + ' + this.userPsswd);
    // Simuler une connexion réussie
    const user = {
      name: 'John Doe',
      typeUser: 'client'
    };

    // Stocker les informations de l'utilisateur dans le localStorage
    localStorage.setItem('name', user.name);
    localStorage.setItem('typeUser', user.typeUser);

  this.router.navigateByUrl('/dashboard/rendezVous')


    // try {
    //   // Faites votre appel Axios ici
    //   const response = await axios.post('votre_url_api', {
    //     email: this.userEmail,
    //     password: this.userPsswd,
    //   });
    //
    //
    //   // Traitement de la réponse
    //   console.log('Réponse de l\'API :', response.data);
    // } catch (error) {
    //   // Gestion des erreurs
    //   console.error('Erreur lors de l\'appel API :', error);
    // }


  }




}
