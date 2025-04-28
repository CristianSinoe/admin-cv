import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private collectionName = 'header';

  constructor(private firestore: AngularFirestore) {}

  // Obtener el único encabezado
  getHeader(): Observable<Header[]> {
    return this.firestore.collection<Header>(this.collectionName).valueChanges();
  }

  // Crear o actualizar el encabezado
  createOrUpdateHeader(header: Header): Promise<void> {
    const id = this.firestore.collection(this.collectionName).doc('header'); // Un solo documento en Firestore
    return id.set(header);
  }
}
