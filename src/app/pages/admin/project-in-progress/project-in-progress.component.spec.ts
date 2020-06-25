import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInProgressComponent } from './project-in-progress.component';

describe('ProjectInProgressComponent', () => {
  let component: ProjectInProgressComponent;
  let fixture: ComponentFixture<ProjectInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
