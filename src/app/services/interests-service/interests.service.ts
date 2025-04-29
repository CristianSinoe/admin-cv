import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Interests } from '../../models/interests/interests.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {
  private dbPath = '/Interests';
  interestsRef: AngularFirestoreCollection<Interests>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): AngularFirestoreCollection<Interests> {
    return this.interestsRef;
  }

  createInterest(interes: Interests): any {
    return this.interestsRef.add({ ...interes });
  }

  updateInterest(id: string, interes: Interests): Promise<void> {
    return this.interestsRef.doc(id).update(interes);
  }

  deleteInterest(id?: string): Promise<void> {
    return this.interestsRef.doc(id).delete();
  }
}
