import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInVerificationComponent } from './project-in-verification.component';

describe('ProjectInVerificationComponent', () => {
  let component: ProjectInVerificationComponent;
  let fixture: ComponentFixture<ProjectInVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
