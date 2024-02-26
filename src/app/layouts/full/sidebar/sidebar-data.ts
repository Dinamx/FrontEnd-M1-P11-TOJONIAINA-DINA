import { NavItem } from './nav-item/nav-item';

// Client
export const navItems: NavItem[] = [
  {
    navCap: 'Appointments',
  },
  {
    displayName: 'New Appointment',
    // iconName: 'playlist-add',
    iconName: 'calendar-heart',
    route: '/dashboard/rendezVous',
  },
  {
    displayName: 'My Appointments',
    iconName: 'list',
    route: '/dashboard/listerendezVous',
  },

  // Payement
  {
    navCap: 'My Account',
  },
  {
    displayName: 'Charge my account',
    iconName: 'coins',
    route: '/dashboard/formcompte',
  },

  //Manager
  {
    navCap: 'MANAGER',
  },
  {
    displayName: 'form employe',
    iconName: 'user-plus',
    route: '/dashboard/formemploye',
  },
  {
    displayName: 'liste employe',
    iconName: 'users',
    route: '/dashboard/listeemploye',
  },
  {
    displayName: 'form service',
    iconName: 'playlist-add',
    route: '/dashboard/formservice',
  },
  {
    displayName: 'Liste service',
    iconName: 'list',
    route: '/dashboard/listeservice',
  },

  {
    displayName: 'liste Offre speciale',
    iconName: 'list',
    route: '/dashboard/listeOffrespeciale',
  },
  {
    displayName: 'form Offre speciale',
    iconName: 'discount',
    route: '/dashboard/formOffrespeciale',
  },
  {
    displayName: 'Nombre de réservation',
    // iconName: 'layout-dashboard',
    iconName: 'bookmarks',
    route: '/dashboard/statistiqueNombreReservation',
  },
  {
    displayName: 'Temps travail Moyen',
    iconName: 'clock-play',
    route: '/dashboard/statistiqueTempsTravailMoyen',
  },
  {
    displayName: 'Chiffre d`\'affaire',
    iconName: 'premium-rights',
    route: '/dashboard/statistiqueNombreReservationComponent',
  },

  {
    displayName: 'Bénéfices mensuels',
    iconName: 'coins',
    route: '/dashboard/statistiqueBeneficeMensuel',
  },


  //Employe
  {
    navCap: 'EMploye',
  },
  {
    displayName: 'form horaire travail employe',
    iconName: 'calendar-time',
    route: '/dashboard/formHoraireTravail',
  },
  {
    displayName: 'listeRendezVousEmp',
    iconName: 'bookmarks',
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
  //Manager
  {
    navCap: 'MANAGER',
  },
  {
    displayName: 'form employe',
    iconName: 'user-plus',
    route: '/dashboard/formemploye',
  },
  {
    displayName: 'liste employe',
    iconName: 'users',
    route: '/dashboard/listeemploye',
  },
  {
    displayName: 'form service',
    iconName: 'playlist-add',
    route: '/dashboard/formservice',
  },
  {
    displayName: 'Liste service',
    iconName: 'list',
    route: '/dashboard/listeservice',
  },

  {
    displayName: 'liste Offre speciale',
    iconName: 'list',
    route: '/dashboard/listeOffrespeciale',
  },
  {
    displayName: 'form Offre speciale',
    iconName: 'discount',
    route: '/dashboard/formOffrespeciale',
  },
  {
    displayName: 'Nombre de réservation',
    // iconName: 'layout-dashboard',
    iconName: 'bookmarks',
    route: '/dashboard/statistiqueNombreReservation',
  },
  {
    displayName: 'Temps travail Moyen',
    iconName: 'clock-play',
    route: '/dashboard/statistiqueTempsTravailMoyen',
  },
  {
    displayName: 'Chiffre d`\'affaire',
    iconName: 'premium-rights',
    route: '/dashboard/statistiqueNombreReservationComponent',
  },

  {
    displayName: 'Bénéfices mensuels',
    iconName: 'coins',
    route: '/dashboard/statistiqueBeneficeMensuel',
  },

];

export const navItemsEmploye: NavItem[] = [
  //Employe
  {
    navCap: 'Home',
  },
  {
    displayName: 'form horaire travail employe',
    iconName: 'calendar-time',
    route: '/dashboard/formHoraireTravail',
  },
  {
    displayName: 'listeRendezVousEmp',
    iconName: 'bookmarks',
    route: '/dashboard/listeRendezVousEmp',
  },
  {
    displayName: 'listeRendezVousDuJourEmp',
    iconName: 'layout-dashboard',
    route: '/dashboard/listeRendezVousDuJourEmp',
  },


];
export const navItemsClient: NavItem[] = [
  {
    navCap: 'Appointments',
  },
  {
    displayName: 'New Appointment',
    // iconName: 'playlist-add',
    iconName: 'calendar-heart',
    route: '/dashboard/rendezVous',

  },
  {
    displayName: 'My Appointments',
    iconName: 'list',
    route: '/dashboard/listerendezVous',
  },

  // Payement
  {
    navCap: 'My Account',
  },
  {
    displayName: 'Charge my account',
    iconName: 'coins',
    route: '/dashboard/formcompte',
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
