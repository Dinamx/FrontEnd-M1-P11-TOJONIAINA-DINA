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
    this.initializeForm();
    // localStorage.clear();
    // this.route.queryParams.subscribe(params => {
    //   this.errorMessage = params['error'];
    // });

    // this.route.params.subscribe(params => {
    //   this.userType = params['userType'] || '1';
    //   this.initializeForm();
    // });
  }

  initializeForm() {
    let userEmail = 'admin';
    let userPsswd = 'admin';

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
        return 'Log In';
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

  isLoading = false;

  async logIn() {
    this.isLoading = true; 

    this.router.navigateByUrl('/dashboard/formservice');
  }


}
