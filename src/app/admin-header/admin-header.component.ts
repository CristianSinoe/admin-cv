import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  myHeader: Header = new Header();
  Header: Header[] = [];
  btntxt: string = 'AGREGAR';
  selectedHeaderId: string | null = null;
  dataLoaded: boolean = false;

  constructor(private headerService: HeaderService) {
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      console.log('LO QUE LLEGA AL HEADER:', data);
      this.Header = data;
      this.dataLoaded = true;
    });
  }

  onSubmit() {
    if (this.selectedHeaderId) {
      if (window.confirm('¿DESEAS ACTUALIZAR ESTE HEADER?')) {
        this.headerService.updateHeader(this.selectedHeaderId, this.myHeader).then(() => {
          alert('¡HEADER ACTUALIZADO!');
          this.resetForm();
        });
      }
    } else {
      if (window.confirm('¿DESEAS AGREGAR ESTE HEADER?')) {
        this.headerService.createHeader(this.myHeader).then(() => {
          alert('¡HEADER AGREGADO CORRECTAMENTE!');
          this.resetForm();
        });
      }
    }
  }

  resetForm() {
    this.myHeader = new Header();
    this.selectedHeaderId = null;
    this.btntxt = 'AGREGAR';
  }

  editarHeader(headerObj: Header): void {
    this.myHeader = { ...headerObj };
    this.selectedHeaderId = headerObj.id ?? null;
    this.btntxt = 'ACTUALIZAR'; 
  }
}
