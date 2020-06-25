import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDescriptionComponent } from './detailed-description.component';

describe('DetailedDescriptionComponent', () => {
  let component: DetailedDescriptionComponent;
  let fixture: ComponentFixture<DetailedDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
