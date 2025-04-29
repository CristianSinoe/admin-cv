import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  skills: Skills[] = [];
  mySkill: Skills = new Skills();
  selectedSkillId: string | null = null;
  btntxt: string = "AGREGAR";

  constructor(private skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.skills = data;
    });
  }

  agregarSkill() {
    if (this.selectedSkillId) {
      if (confirm('¿DESEAS EDITAR ESTA HABILIDAD?')) {
        this.skillsService.updateSkill(this.selectedSkillId, this.mySkill).then(() => {
          this.mySkill = new Skills();
          this.btntxt = "AGREGAR";
          this.selectedSkillId = null;
        });
      }
    } else {
      this.skillsService.createSkill(this.mySkill).then(() => {
        this.mySkill = new Skills();
      });
    }
  }

  editarSkill(skill: Skills) {
    if (confirm('¿DESEAR CARGAR ESTA HABILIDAD PARA EDITAR?')) {
      this.mySkill = { ...skill };
      this.selectedSkillId = skill.id!;
      this.btntxt = "EDITAR";
    }
  }

  deleteSkill(id?: string) {
    if (confirm('¿DESEAS ELIMINAR ESTA HABILIDAD?')) {
      this.skillsService.deleteSkill(id);
    }
  }
}