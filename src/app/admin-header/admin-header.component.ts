import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  header: Header = new Header();
  btnText: string = 'Update Header';

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.loadHeaderData();  // Cargar el encabezado
  }

  loadHeaderData(): void {
    this.headerService.getHeader().subscribe(data => {
      this.header = data[0] || new Header(); // Supone que solo hay un documento en la colección
    });
  }

  updateHeader(): void {
    if (this.header.name && this.header.email && this.header.phoneNumber) {
      this.headerService.createOrUpdateHeader(this.header).then(() => {
        console.log('Header updated successfully');
      }).catch(error => {
        console.error('Error updating header: ', error);
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }
}
