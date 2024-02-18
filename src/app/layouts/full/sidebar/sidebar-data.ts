import { NavItem } from './nav-item/nav-item';

// Client
export const navItems: NavItem[] = [
  {
    navCap: 'Appointments',
  },
  {
    displayName: 'New Appointment',
    iconName: 'layout-dashboard',
    route: '/dashboard/formrendezVous',
  },
  {
    displayName: 'My Appointments',
    iconName: 'layout-dashboard',
    route: '/dashboard/listerendezVous',
  },

  // Payement
  {
    navCap: 'My Account',
  },
  {
    displayName: 'Charge my account',
    iconName: 'layout-dashboard',
    route: '/dashboard/formcompte',
  },

  //Manager
  {
    navCap: 'MANAGER',
  },
  {
    displayName: 'form employe',
    iconName: 'layout-dashboard',
    route: '/dashboard/formemploye',
  },
  {
    displayName: 'liste employe',
    iconName: 'layout-dashboard',
    route: '/dashboard/listeemploye',
  },
  {
    displayName: 'form service',
    iconName: 'layout-dashboard',
    route: '/dashboard/formservice',
  },
  {
    displayName: 'liste service',
    iconName: 'layout-dashboard',
    route: '/dashboard/listeservice',
  },

  //Manager
  {
    navCap: 'EMPLOYE',
  },
  {
    displayName: 'form horaire travail employe',
    iconName: 'layout-dashboard',
    route: '/dashboard/formHoraireTravail',
  },
  {
    displayName: 'listeRendezVousEmp',
    iconName: 'layout-dashboard',
    route: '/dashboard/listeRendezVousEmp',
  },
  {
    displayName: 'listeRendezVousDuJourEmp',
    iconName: 'layout-dashboard',
    route: '/dashboard/listeRendezVousDuJourEmp',
  },


  {
    navCap: 'My Account',
  },
  {
    displayName: 'Charge my account',
    iconName: 'layout-dashboard',
    route: '/dashboard/formcompte',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];


export const navItemsAdmin: NavItem[] = [
  {
    navCap: 'Services',
  },
  {
    displayName: 'New Service',
    iconName: 'layout-dashboard',
    route: '/dashboard/formrendezVous',
  },
  {
    displayName: 'All Services',
    iconName: 'layout-dashboard',
    route: '/dashboard/rendezVous',
  },

  // Personnel
  {
    navCap: 'Employees',
  },
  {
    displayName: 'New Employee',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'All employee',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    navCap: 'Statistics',
  },
  {
    displayName: 'Temps moyen de travail par employe',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Nombre de reservation par jour, par mois',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Chiffre d\'affaire',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Benefice mensuel',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];

export const navItemsEmploye: NavItem[] = [
  {
    navCap: 'Appointments',
  },
  {
    displayName: 'All Apointments',
    iconName: 'layout-dashboard',
    route: '/dashboard/formrendezVous',
  },
  {
    displayName: 'Historic',
    iconName: 'layout-dashboard',
    route: '/dashboard/rendezVous',
  },

  // Personnel
  {
    navCap: 'Employees',
  },
  {
    displayName: 'New Employee',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'All employee',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    navCap: 'Statistics',
  },
  {
    displayName: 'Temps moyen de travail par employe',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Nombre de reservation par jour, par mois',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Chiffre d\'affaire',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Benefice mensuel',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];

export const navItemsNo: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];
