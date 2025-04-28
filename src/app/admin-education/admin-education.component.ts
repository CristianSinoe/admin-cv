import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service'; // Asegúrate de tener este servicio
import { Education } from '../models/education/education.model'; // Asegúrate de tener este modelo

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent implements OnInit {

  myEducation: Education = new Education();
  educationData: Education[] = [];
  btnText: string = 'Add Education';

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.loadEducationData();
  }

  loadEducationData(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationData = data;
    });
  }

  addEducation(): void {
    if (this.myEducation.school && this.myEducation.training && this.myEducation.licenses) {
      this.educationService.createEducation(this.myEducation).then(() => {
        this.loadEducationData(); // Recargar los datos después de agregar una nueva entrada
        this.myEducation = new Education(); // Limpiar el formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteEducation(id: string): void {
    if (id) {
      this.educationService.deleteEducation(id).then(() => {
        this.loadEducationData(); // Recargar los datos después de eliminar una entrada
      }).catch(error => {
        console.error('Error deleting education: ', error);
      });
    } else {
      console.error('Invalid education ID');
    }
  }
}