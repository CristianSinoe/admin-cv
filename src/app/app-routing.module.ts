import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminEducationComponent } from './admin-education/admin-education.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component';

const routes: Routes = [
  { path: 'certificates', component: AdminCertificatesComponent },
  { path: 'education', component: AdminEducationComponent },
  { path: 'header', component: AdminHeaderComponent },
  { path: 'interests', component: AdminInterestsComponent },
  { path: 'languages', component: AdminLanguagesComponent },
  { path: 'skills', component: AdminSkillsComponent },
  { path: 'workexperience', component: AdminWorkexperienceComponent },
  { path: '', redirectTo: '/header', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
