import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Header } from '../../models/header/header.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private dbPath = '/header';
  headerRef: AngularFirestoreCollection<Header>

  constructor(private db: AngularFirestore) {
    this.headerRef = db.collection(this.dbPath);
  }

  getHeader(): AngularFirestoreCollection<Header> {
    return this.headerRef;
  }

  createHeader(data: Header): Promise<any> {
    return this.headerRef.add({ ...data });
  }
  

  updateHeader(id: string, data: Header): Promise<void> {
    return this.db.collection(this.dbPath).doc(id).update(data);
  }

  deleteHeader(id: string): Promise<void> {
    return this.headerRef.doc(id).delete();
  }  
}

