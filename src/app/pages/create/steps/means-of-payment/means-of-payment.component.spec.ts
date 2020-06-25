import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeansOfPaymentComponent } from './means-of-payment.component';

describe('MeansOfPaymentComponent', () => {
  let component: MeansOfPaymentComponent;
  let fixture: ComponentFixture<MeansOfPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeansOfPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeansOfPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
