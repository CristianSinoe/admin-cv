import { Component, OnInit } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  btntxt: string = "AGREGAR";
  certificates: Certificates[] = [];
  myCertificate: Certificates = new Certificates();
  selectedCertificateId: string | null = null;

  constructor(public certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
    });
  }

  AgregarCertificate() {
    if (this.selectedCertificateId) {
      if (confirm("¿DESEAS ACTUALIZAR ESTE CERTIFICADO?")) {
        this.certificatesService.updateCertificate(this.selectedCertificateId, this.myCertificate).then(() => {
          this.resetForm();
        });
      }
    } else {
      if (confirm("¿DESEAS AGREGAR ESTE CERTIFCADO?")) {
        this.certificatesService.createCertificate(this.myCertificate).then(() => {
          this.resetForm();
        });
      }
    }
  }

  deleteCertificate(id?: string) {
    if (confirm("¿SEGURO QUE DESEAS ALIMINAR ESTE CERTIFICADO?")) {
      this.certificatesService.deleteCertificate(id).then(() => {
        console.log('CERTIFICADO ELIMINADO CORRECTAMENTE');
      });
    }
  }

  EditarCertificate(cert: Certificates) {
    this.myCertificate = { ...cert };
    this.selectedCertificateId = cert.id ?? null;
    this.btntxt = "EDITAR";
  }

  resetForm() {
    this.myCertificate = new Certificates();
    this.selectedCertificateId = null;
    this.btntxt = "AGREGAR";
  }
}
