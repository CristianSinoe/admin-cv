import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkExperience } from '../../models/work-experience/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private dbPath = '/work-experience';
  workExperienceRef: AngularFirestoreCollection<WorkExperience>;

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath);
  }

  // Usamos snapshotChanges() para obtener el id además de los datos
  getWorkExperience(): Observable<WorkExperience[]> {
    return this.workExperienceRef.snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as WorkExperience;
          const id = a.payload.doc.id;
          return { id, ...data };  // Incluimos el id dentro del objeto
        })
      )
    );
  }

  // Crear un nuevo trabajo en la colección
  createWorkExperience(myJob: WorkExperience): Promise<any> {
    return this.workExperienceRef.add({ ...myJob });
  }

  // Eliminar un trabajo por su id
  deleteWorkExperience(id: string): Promise<void> {
    return this.workExperienceRef.doc(id).delete();
  }
}
