import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChoicesComponent } from './payment-choices.component';

describe('PaymentChoicesComponent', () => {
  let component: PaymentChoicesComponent;
  let fixture: ComponentFixture<PaymentChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentChoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
