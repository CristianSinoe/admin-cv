import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service'; 
import { Education } from '../models/education/education.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  btntxt: string = "AGREGAR";
  education: Education[] = [];
  myEducation: Education = new Education();
  selectedEduId: string | null = null;

  constructor(public educationService: EducationService) {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          id: c.payload.doc.id, ...c.payload.doc.data()
        }))
      )
    ).subscribe(data => {
      this.education = data;
    });
  }

  AgregarEdu() {
    if (this.selectedEduId) {
      if (confirm('¿ESTAS SEGURO QUE QUIERES EDITAR ESTA ENTRADA DE EDUCACION?')) {
        this.educationService.updateEducation(this.selectedEduId, this.myEducation).then(() => {
          alert('ACTUALIZADO EXITOSAMENTE');
          this.resetForm();
        });
      }
    } else {
      if (confirm('¿DESEAS AGREGAR ESTA NUEVA ENTRADA DE EDUCACION?')) {
        this.educationService.createEducation(this.myEducation).then(() => {
          alert('SE AGREGO EXISTOSAMENTE');
          this.resetForm();
        });
      }
    }
  }  

  deleteEducation(id?: string) {
    if (confirm('¿ESTAS SEGURO QUE DESEAS ELIMININAR ESTA ENTRADA?')) {
      this.educationService.deleteEducation(id).then(() => {
        console.log('ELIMINADO CORRECTAMENTE');
      });
    }
  }

  EditarEdu(edu: Education) {
    if (confirm(`¿ESTAS SEGURO DE QUE QUIERES EDITAR ESTA ENTRADA ${edu.school}?`)) {
      this.myEducation = { ...edu };
      this.selectedEduId = edu.id ?? null;
      this.btntxt = "ACTUALIZAR";
    }
  }  

  resetForm() {
    this.myEducation = new Education();
    this.selectedEduId = null;
    this.btntxt = "AGREGAR";
  }
}
