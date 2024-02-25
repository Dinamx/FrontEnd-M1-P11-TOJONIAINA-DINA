import {ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {TablerIconsModule} from "angular-tabler-icons";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import Compressor from "compressorjs";

@Component({
  selector: 'app-form-service',
  templateUrl: './form-service.component.html',
  styleUrls: ['./form-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
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
    AsyncPipe,
  ],
})
export class FormServiceComponent {
  constructor(private router: Router , private cd: ChangeDetectorRef) {}

  imageToShow : string = '/assets/images/profile/user-1.jpg';



  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(6)]),
    prix: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]), // Prix positif
    duree: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]), // Nombre entier pour la durée
    commission: new FormControl('', [Validators.required, Validators.pattern(/^100(\.0{1,2})?$|^(\d{1,2}(\.\d{1,2})?)$/)]), // Pourcentage entre 0 et 100
    image: new FormControl('', [Validators.required]),
  });




  get f() {
    return this.form.controls;
  }

  submit() {
    console.log('Form value:', this.form.value);
    if (this.form.valid) {
      console.log('Form submitted successfully');
      console.log('Form value:', this.form.value);

      alert('Insertion dans service effectuée');



      // this.router.navigate();



    } else {
      alert('Erreur')
      console.log('Form submission failed');
    }
  }

  positiveNumberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value) || value <= 0) {
      return { 'positiveNumber': true };
    }
    return null;
  }

  isNumberValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value)) {
      return { 'number': true };
    }
    return null;
  }

  percentageValidator(control: FormControl) {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 100) {
      return { 'percentage': true };
    }
    return null;
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
        quality:  0.2,
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




