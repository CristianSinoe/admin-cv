import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  interests: Interests[] = [];
  myInterest: Interests = new Interests();
  selectedInterestId: string | null = null;
  btntxt: string = "AGREGAR";

  constructor(private interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.interests = data;
    });
  }

  agregarInterest() {
    if (this.selectedInterestId) {
      if (confirm('¿DESEAS EDITAR ESTE INTERES?')) {
        this.interestsService.updateInterest(this.selectedInterestId, this.myInterest).then(() => {
          this.myInterest = new Interests();
          this.btntxt = "AGREGAR";
          this.selectedInterestId = null;
        });
      }
    } else {
      this.interestsService.createInterest(this.myInterest).then(() => {
        this.myInterest = new Interests();
      });
    }
  }

  editarInterest(interes: Interests) {
    if (confirm('¿DESEAS CARGAR ESTE INTERES PARA EDITAR?')) {
      this.myInterest = { ...interes };
      this.selectedInterestId = interes.id!;
      this.btntxt = "EDITAR";
    }
  }

  deleteInterest(id?: string) {
    if (confirm('¿DESEAS ELIMINAR ESTE INTERES?')) {
      this.interestsService.deleteInterest(id);
    }
  }
}

