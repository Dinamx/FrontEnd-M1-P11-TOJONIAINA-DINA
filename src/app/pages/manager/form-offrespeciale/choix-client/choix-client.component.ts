import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {basicImportsModule} from "../../../../basicImports.module";

@Component({
  selector: 'app-choix-client',
  templateUrl: './choix-client.component.html',
  styleUrls: ['./choix-client.component.scss'],
  standalone : true,
  imports: [
    // Autres imports
    MatCheckboxModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule , basicImportsModule
  ],
})
export class ChoixClientComponent {
  clients = [
    {value: 'client1', viewValue: 'Client  1'},
    {value: 'client2', viewValue: 'Client  2'},
    {value: 'client3', viewValue: 'Client  3'}
  ];

  selectedClients: string[] = [];



  newClient: string = ''; // Ajout d'une propriété pour le nouveau client


  constructor(
    public dialogRef: MatDialogRef<ChoixClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectClient(client: string): void {
    const index = this.selectedClients.indexOf(client);
    if (index <  0) {
      this.selectedClients.push(client);
    } else {
      this.selectedClients.splice(index,  1);
    }
  }

  addNewClient(): void {
    if (this.newClient.trim() !== '') {
      this.clients.push({value: this.newClient, viewValue: this.newClient});
      this.selectedClients.push(this.newClient);
      this.newClient = ''; // Réinitialiser le champ de saisie
    }
  }


}
