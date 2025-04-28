import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private collectionName = 'skills';

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las habilidades
  getSkills(): Observable<Skills[]> {
    return this.firestore.collection<Skills>(this.collectionName).valueChanges();
  }

  // Crear una nueva habilidad
  createSkill(skill: Skills): Promise<void> {
    const id = this.firestore.createId();  // Crea un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(skill);
  }

  // Eliminar una habilidad
  deleteSkill(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
