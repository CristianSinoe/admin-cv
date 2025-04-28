import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private collectionName = 'interests';

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los intereses
  getInterests(): Observable<Interests[]> {
    return this.firestore.collection<Interests>(this.collectionName).valueChanges();
  }

  // Crear un nuevo interés
  createInterest(interest: Interests): Promise<void> {
    const id = this.firestore.createId();  // Crea un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(interest);
  }

  // Eliminar un interés
  deleteInterest(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
