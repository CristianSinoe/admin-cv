import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent implements OnInit {

  myJob: WorkExperience = new WorkExperience();
  workExperienceData: WorkExperience[] = [];
  btnText: string = 'Add Work Experience';

  constructor(private workExperienceService: WorkExperienceService) {}

  ngOnInit(): void {
    this.loadWorkExperienceData();  // Cargar los datos de experiencia laboral
  }

  loadWorkExperienceData(): void {
    // Nos suscribimos al observable para obtener los datos de trabajo con sus id
    this.workExperienceService.getWorkExperience().subscribe(data => {
      this.workExperienceData = data;
    });
  }

  addWorkExperience(): void {
    if (this.myJob.position && this.myJob.company && this.myJob.startDate && this.myJob.endDate) {
      this.workExperienceService.createWorkExperience(this.myJob).then(() => {
        this.loadWorkExperienceData();  // Recargar los datos después de agregar un nuevo trabajo
        this.myJob = new WorkExperience();  // Limpiar los campos del formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteJob(id: string): void {
    if (id) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        this.loadWorkExperienceData();  // Recargar los datos después de eliminar un trabajo
      }).catch(error => {
        console.error('Error deleting work experience: ', error);
      });
    } else {
      console.error('Invalid work experience ID');
    }
  }
}
