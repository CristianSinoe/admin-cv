import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component';
import { AdminEducationComponent } from './admin-education/admin-education.component';
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AdminHeaderComponent,
    AdminWorkexperienceComponent,
    AdminEducationComponent,
    AdminCertificatesComponent,
    AdminSkillsComponent,
    AdminLanguagesComponent,
    AdminInterestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig) // Inicializa Firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
