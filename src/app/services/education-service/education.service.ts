import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/Education';
  educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore){ 
    this.educationRef = db.collection(this.dbPath);
  }

  getEducation(): AngularFirestoreCollection<Education>{
    return this.educationRef;
  }

  createEducation(myEdu: Education): any {
    return this.educationRef.add({ ...myEdu})
  }

  deleteEducation(id?: string): Promise<void> {
    return this.educationRef.doc(id).delete();
  }

  updateEducation(id: string, data: Education): Promise<void> {
    return this.educationRef.doc(id).update(data);
  }
  
}