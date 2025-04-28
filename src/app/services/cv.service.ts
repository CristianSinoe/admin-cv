import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private firestore: AngularFirestore) { }

  getCvs(): Observable<any[]> {
    return this.firestore.collection('cvs').valueChanges();
  }

  getCv(id: string): Observable<any> {
    return this.firestore.collection('cvs').doc(id).valueChanges();
  }

  createCv(cv: any): Promise<any> {
    return this.firestore.collection('cvs').add(cv);
  }

  updateCv(id: string, cv: any): Promise<void> {
    return this.firestore.collection('cvs').doc(id).update(cv);
  }

  deleteCv(id: string): Promise<void> {
    return this.firestore.collection('cvs').doc(id).delete();
  }
}
