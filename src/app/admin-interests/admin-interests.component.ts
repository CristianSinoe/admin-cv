import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent implements OnInit {

  myInterest: Interests = new Interests();
  interestsData: Interests[] = [];
  btnText: string = 'Add Interest';

  constructor(private interestsService: InterestsService) {}

  ngOnInit(): void {
    this.loadInterestsData();  // Cargar los datos de intereses
  }

  loadInterestsData(): void {
    this.interestsService.getInterests().subscribe(data => {
      this.interestsData = data;
    });
  }

  addInterest(): void {
    if (this.myInterest.interes) {
      this.interestsService.createInterest(this.myInterest).then(() => {
        this.loadInterestsData();  // Recargar los datos después de agregar un nuevo interés
        this.myInterest = new Interests();  // Limpiar los campos del formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteInterest(id: string): void {
    if (id) {
      this.interestsService.deleteInterest(id).then(() => {
        this.loadInterestsData();  // Recargar los datos después de eliminar un interés
      }).catch(error => {
        console.error('Error deleting interest: ', error);
      });
    } else {
      console.error('Invalid interest ID');
    }
  }
}
