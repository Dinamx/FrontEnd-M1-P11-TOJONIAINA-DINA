// Services
export interface Service {
  id: string;
  service: string;
  prix: number;
  duree: string;
  comission: number;
}

// Employés
export interface Employe {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  number: number;
}

// RendezVous
export interface Rendezvous {
  date_heure: string;
  service: string;
  client: string;
  employe: string;
  prixpaye: string;
  comissionemploye: string;
  duree: string;
  comission: string;
  etat_rdv: string;
}
