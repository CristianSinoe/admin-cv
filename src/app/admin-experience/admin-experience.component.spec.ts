import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExperienceComponent } from './admin-experience.component';

describe('AdminExperienceComponent', () => {
  let component: AdminExperienceComponent;
  let fixture: ComponentFixture<AdminExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
