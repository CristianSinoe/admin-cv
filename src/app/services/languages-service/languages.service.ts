import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  private collectionName = 'languages';

  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los idiomas
  getLanguages(): Observable<Languages[]> {
    return this.firestore.collection<Languages>(this.collectionName).valueChanges();
  }

  // Crear un nuevo idioma
  createLanguage(language: Languages): Promise<void> {
    const id = this.firestore.createId();  // Crea un ID único para el documento
    return this.firestore.collection(this.collectionName).doc(id).set(language);
  }

  // Eliminar un idioma
  deleteLanguage(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
