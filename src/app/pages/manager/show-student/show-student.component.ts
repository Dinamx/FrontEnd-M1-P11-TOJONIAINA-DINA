import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Student } from "../../../models/interfaces";
import { StudentService } from "../../../services/controllers/student/student-service.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatCardModule } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatGridList, MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowStudentComponent {
  myControl = new FormControl('');
  studentId: string = '';
  options: string[] = ['One', 'Two', 'Three'];
  student: Student | undefined;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    try {
      const id = this.route.snapshot.params['id']; // Récupère l'ID de l'URL
      this.student = await this.studentService.getStudentById(id);
      console.log("Student:", this.student);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'étudiant :', error);
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }
}
