import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent implements OnInit {

  myCertificate: Certificates = new Certificates();
  certificatesData: Certificates[] = [];
  btnText: string = 'Add Certificate';

  constructor(private certificatesService: CertificatesService) {}

  ngOnInit(): void {
    this.loadCertificatesData();  // Cargar los datos de certificados
  }

  loadCertificatesData(): void {
    this.certificatesService.getCertificates().subscribe(data => {
      this.certificatesData = data;
    });
  }

  addCertificate(): void {
    if (this.myCertificate.institution && this.myCertificate.certificacion) {
      this.certificatesService.createCertificate(this.myCertificate).then(() => {
        this.loadCertificatesData();  // Recargar los datos después de agregar un nuevo certificado
        this.myCertificate = new Certificates();  // Limpiar los campos del formulario
      });
    } else {
      console.error('All fields must be filled out.');
    }
  }

  deleteCertificate(id: string): void {
    if (id) {
      this.certificatesService.deleteCertificate(id).then(() => {
        this.loadCertificatesData();  // Recargar los datos después de eliminar un certificado
      }).catch(error => {
        console.error('Error deleting certificate: ', error);
      });
    } else {
      console.error('Invalid certificate ID');
    }
  }
}
