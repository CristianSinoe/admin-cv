import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent implements OnInit {

  myLanguage: Languages = new Languages();
  languagesData: Languages[] = [];
  btnText: string = 'Add Language';

  constructor(private languagesService: LanguagesService) {}

  ngOnInit(): void {
    this.loadLanguagesData();  // Cargar los datos de idiomas
  }

  loadLanguagesData(): void {
    this.languagesService.getLanguages().subscribe(data => {
      this.languagesData = data;
    });
  }

  addLanguage(): void {
    if (this.myLanguage.idiomas && this.myLanguage.nivel) {
      this.languagesService.createLanguage(this.myLanguage).then(() => {
        this.loadLanguagesData();  // Recargar los datos después de agregar un nuevo idioma
        this.myLanguage = new Languages();  // Limpiar los campos del formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteLanguage(id: string): void {
    if (id) {
      this.languagesService.deleteLanguage(id).then(() => {
        this.loadLanguagesData();  // Recargar los datos después de eliminar un idioma
      }).catch(error => {
        console.error('Error deleting language: ', error);
      });
    } else {
      console.error('Invalid language ID');
    }
  }
}
