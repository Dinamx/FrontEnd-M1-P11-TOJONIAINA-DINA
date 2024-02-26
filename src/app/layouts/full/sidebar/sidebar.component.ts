import { Component, OnInit } from '@angular/core';
import { navItems , navItemsAdmin , navItemsEmploye , navItemsClient } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  navItemsClient = navItemsClient;
  navItemsEmploye = navItemsEmploye;
  navItemsManager = navItemsAdmin;

  constructor(public navService: NavService ,  private router: Router , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.checkUserTypeAndRedirect();
  }

  checkUserTypeAndRedirect() {
    const userType = localStorage.getItem('typeUser');
    if (!userType || userType === '') {
      this.redirectWithError('Please Log In');
    } else if (userType === 'client') {
      this.navItemsClient = navItems;
    }else if (userType === 'employe') {
      this.navItemsClient = navItems;
    }else if (userType === 'admin') {
      this.navItemsClient = navItems;
    }
  }

  redirectWithError(errorMessage: string): void {
    this.router.navigate(['/authentication/login'], { relativeTo: this.activatedRoute, queryParams: { error: errorMessage }});
  }

}
