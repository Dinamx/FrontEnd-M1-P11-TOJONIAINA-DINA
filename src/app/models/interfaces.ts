// Services
export interface Service {
  id: string;
  prix: number;
  duree: string;
  comission: number;
  image: string;
  description: string;
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
  rappel: string;
  comissionemploye: string;
  duree: string;
  comission: string;
  etat_rdv: string;
  etat_valid: string;

}


export interface Offrespeciale {
  date_heure_envoi: string;
  service: string;
  date_fin: string;
  description: string | 'Promotion';
  client: any;
}
















export interface RendezvousEmploye {
  _id: string;
  date_heure: string;
  service: string;
  client: string | null;
  employe: {
    _id: string;
    email: string;
  };
  prixpaye: number;
  rappel: number;
  comissionemploye: number;
  duree: number;
  comission: number;
  etat_rdv: number;
  etat_valid: number;
  __v: number;
}



