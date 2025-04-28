import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent implements OnInit {

  mySkill: Skills = new Skills();
  skillsData: Skills[] = [];
  btnText: string = 'Add Skill';

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.loadSkillsData();  // Cargar los datos de habilidades
  }

  loadSkillsData(): void {
    this.skillsService.getSkills().subscribe(data => {
      this.skillsData = data;
    });
  }

  addSkill(): void {
    if (this.mySkill.lenguajes && this.mySkill.tecnologias) {
      this.skillsService.createSkill(this.mySkill).then(() => {
        this.loadSkillsData();  // Recargar los datos después de agregar una nueva habilidad
        this.mySkill = new Skills();  // Limpiar los campos del formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteSkill(id: string): void {
    if (id) {
      this.skillsService.deleteSkill(id).then(() => {
        this.loadSkillsData();  // Recargar los datos después de eliminar una habilidad
      }).catch(error => {
        console.error('Error deleting skill: ', error);
      });
    } else {
      console.error('Invalid skill ID');
    }
  }
}
