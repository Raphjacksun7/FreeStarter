import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRewardsComponent } from './update-rewards.component';

describe('UpdateRewardsComponent', () => {
  let component: UpdateRewardsComponent;
  let fixture: ComponentFixture<UpdateRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
