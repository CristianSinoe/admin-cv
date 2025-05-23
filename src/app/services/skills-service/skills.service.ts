import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/Skills';
  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createSkill(skill: Skills): any {
    return this.skillsRef.add({ ...skill });
  }

  updateSkill(id: string, skill: Skills): Promise<void> {
    return this.skillsRef.doc(id).update(skill);
  }

  deleteSkill(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }
}
