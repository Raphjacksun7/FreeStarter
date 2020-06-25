import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByOwnerComponent } from './view-by-owner.component';

describe('ViewByOwnerComponent', () => {
  let component: ViewByOwnerComponent;
  let fixture: ComponentFixture<ViewByOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewByOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
