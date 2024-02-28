import {ChangeDetectorRef, Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Router} from "@angular/router";
import {WebservicesService} from "../../services/webservice/webservices.service";
import Compressor from "compressorjs";
import axios from "axios";
import {url} from "../../app.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss'],
  standalone: true,
  imports: [MatButtonModule,
    MatRadioModule,
    MatMenuModule,
    MatIconModule,
    TablerIconsModule,
    MatCardModule,
    NgApexchartsModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    AsyncPipe]
})
export class MonProfilComponent {
  hide = true;
  isLoading = false;
  constructor(private router: Router , private cd: ChangeDetectorRef , private  webService : WebservicesService) {

    if (localStorage.getItem('image')){
      this.imageToShow = localStorage.getItem('image');
    }
  }




  imageToShow : string | null = '/assets/images/profile/profile.png';
  form = new FormGroup({
    nom: new FormControl(localStorage.getItem('nom'), [Validators.required]),
    email: new FormControl(localStorage.getItem('email'), [Validators.required]),
    password: new FormControl('', [Validators.required]),
    image: new FormControl(localStorage.getItem('image'), [Validators.required]),
    type_user: new FormControl(localStorage.getItem('typeUser'), [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }


  submit() {
    this.isLoading = true;
    if (this.form.valid) {
      console.log('Form submitted successfully');
      console.log('Form value:', this.form.value);

      axios.put(`${url}/login/update/${localStorage.getItem('userId')}`, this.form.value)
        .then(response => {
          // Afficher un message d'alerte "OK"
          alert('Modification effectué');
          // Afficher l'utilisateur mis à jour dans la console
          localStorage.setItem('email', response.data.user.email);
          localStorage.setItem('nom', response.data.user.nom);
          localStorage.setItem('image', response.data.user.image);
          this.cd.detectChanges();
          location.reload();
          this.isLoading = false;

        })
        .catch(error => {
          this.isLoading = false;
          console.error('Une erreur s\'est produite lors de la mise à jour du rendez-vous : ', error);
          alert('Une erreur s\'est produite lors de la mise à jour du rendez-vous.');
        });


    } else {
      this.isLoading = false;
      alert('Formulaire erroné')
      console.log('Form submission failed');
    }
  }


  onFileChange(event: any) {
    this.handleFile(event.target.files[0]);

  }

  onDragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length >  0) {
      const files = event.dataTransfer.files;
      this.handleFile(files[0]);
    }
  }

  handleFile(file: File) {
    if (file) {
      new Compressor(file, {
        quality:  0.01,
        success: (result) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            console.log(base64String);
            // alert('ONLOADEND')
            console.log(base64String);
            this.imageToShow = base64String;
            const imageControl = this.form.get('image');
            if (imageControl) {
              imageControl.setValue(base64String);
            }
            // alert('Bonjour');
            // alert(this.imageToShow);
            console.log('IMAGE TO SHOW');
            this.cd.detectChanges();
            // Traiter la chaîne base64 de l'image compressée
          };
          reader.readAsDataURL(result);
        },
        error: (err) => {
          console.error('Erreur de compression :', err.message);
        },
      });
    }
  }

  openFileDialog() {
    console.log('CLICKED')
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      console.log('CLICKED OK ')
      fileInput.click();
    }
  }




}
