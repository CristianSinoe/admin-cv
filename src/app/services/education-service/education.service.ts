import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Education } from '../../models/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';
  private educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath);
  }

  // Obtener todos los documentos de educación
  getEducation(): Observable<Education[]> {
    return this.educationRef.valueChanges();  // Aquí estamos devolviendo un Observable
  }

  // Crear una nueva entrada de educación en la colección
  createEducation(myEducation: Education): Promise<any> {
    return this.educationRef.add({ ...myEducation });
  }

  // Eliminar un documento de educación por id
  deleteEducation(id: string): Promise<void> {
    if (!id) {
      throw new Error('Invalid ID provided');
    }
    return this.educationRef.doc(id).delete();
  }
}
