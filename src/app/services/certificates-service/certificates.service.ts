import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Certificates } from '../../models/certificates/certificates.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {

  private collectionName = 'certificates';

  constructor(private firestore: AngularFirestore) {}

  getCertificates(): Observable<Certificates[]> {
    return this.firestore.collection<Certificates>(this.collectionName).valueChanges();
  }

  createCertificate(cert: Certificates): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection(this.collectionName).doc(id).set(cert);
  }

  deleteCertificate(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
