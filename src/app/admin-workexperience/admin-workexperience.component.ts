import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string = "AGREGAR";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();
  selectedJobId: string | null = null;

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.workExperience = data;
    });
  }

  AgregarJob() {
    if (this.selectedJobId) {
      this.workExperienceService.updateWorkExperience(this.selectedJobId, this.myWorkExperience)
        .then(() => {
          console.log('REGISTRO ACTUALIZADO EXISTOSAMENTE');
          this.resetForm();
        })
        .catch(err => console.log('ERROR AL ACTUALIZAR EL TRABAJO:', err));
    } else {
      this.workExperienceService.createWorkExperience(this.myWorkExperience)
        .then(() => {
          console.log('TRABAJO CREADO EXITOSAMENTE');
          this.resetForm();
        })
        .catch((err: any) => console.log('ERROR AL AGREGAR EL TRABAJO:', err));
    }
  }
  

  EditarJob(job: WorkExperience) {
    if (confirm(`¿DESEAS EDITAR EL TRABAJO EN ${job.company}?`)) {
      this.myWorkExperience = { ...job };
      this.selectedJobId = job.id ?? null; 
      this.btntxt = "ACTUALIZAR";
    }
  }

  deleteJob(id?: string) {
    if (confirm('¿ESTAS SEGURO DE ELIMINAR ESTE REGISTRO?')) {
      this.workExperienceService.deleteWorkExperience(id).then(() => {
        console.log(' TRABAJO ELIMINADO EXITOSAMENTE');
      }).catch(err => console.log('ERROR AL ELIMINAR EL TRABAJO: ', err));
    }
  }

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.selectedJobId = null;
    this.btntxt = "AGREGAR";
  }
}

