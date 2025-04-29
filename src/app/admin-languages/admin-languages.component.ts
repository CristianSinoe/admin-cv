import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  languages: Languages[] = [];
  myLanguage: Languages = new Languages();
  selectedLangId: string | null = null;
  btntxt: string = "AGREGAR";

  constructor(private languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.languages = data;
    });
  }

  agregarLanguage() {
    if (this.selectedLangId) {
      if (confirm('¿DESEAS EDITAR ESTE IDIOMA?')) {
        this.languagesService.updateLanguage(this.selectedLangId, this.myLanguage).then(() => {
          this.myLanguage = new Languages();
          this.btntxt = "AGREGAR";
          this.selectedLangId = null;
        });
      }
    } else {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        this.myLanguage = new Languages();
      });
    }
  }

  editarLanguage(lang: Languages) {
    if (confirm('¿DESEAR CARGAR ESTE IDIOMA PARA EDITAR?')) {
      this.myLanguage = { ...lang };
      this.selectedLangId = lang.id!;
      this.btntxt = "EDITAR";
    }
  }

  deleteLanguage(id?: string) {
    if (confirm('¿DESEAS ELIMINAR ESTE IDIOMA?')) {
      this.languagesService.deleteLanguage(id);
    }
  }
}
