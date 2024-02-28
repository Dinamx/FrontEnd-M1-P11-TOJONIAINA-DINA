import {ChangeDetectorRef, Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {WebservicesService} from "../../../services/webservice/webservices.service";
import Compressor from "compressorjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(private router: Router ,private webService : WebservicesService , private cd: ChangeDetectorRef) {}

  imageToShow : string = '/assets/images/profile/profile.png';


  hide = true;


  form = new FormGroup({
    // uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required), // Ajout de la validation email
    nom: new FormControl('', [Validators.required]), // Ajout de la validation email
    email: new FormControl('', [Validators.required, Validators.email]), // Ajout de la validation email
    password: new FormControl('', [Validators.required, Validators.minLength(4)]), // Modification de la validation du mot de passe
    type_user: new FormControl('client', Validators.required), // Modification de la validation du mot de passe
  });

  get f() {
    return this.form.controls;
  }

  signUp(){
    if (this.form.valid) { // Vérification si le formulaire est valide
      console.log('Sign up');
      console.log(this.form);
      const retour = this.webService.insertDataRetour(this.form.value , '/login/signup');
      alert('Compte Enregistré');
      this.router.navigateByUrl('');
      // Vous pouvez ajouter ici la logique pour envoyer les données au serveur ou autre traitement nécessaire
    } else {

      // Gérer le cas où le formulaire n'est pas valide, par exemple afficher des messages d'erreur
      console.log('Invalid form');
    }
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
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
