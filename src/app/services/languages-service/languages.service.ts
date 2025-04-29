import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/Languages';
  languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Languages> {
    return this.languagesRef;
  }

  createLanguage(lang: Languages): any {
    return this.languagesRef.add({ ...lang });
  }

  updateLanguage(id: string, lang: Languages): Promise<void> {
    return this.languagesRef.doc(id).update(lang);
  }

  deleteLanguage(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }
}
