import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCampaignDetailsComponent } from './update-campaign-details.component';

describe('UpdateCampaignDetailsComponent', () => {
  let component: UpdateCampaignDetailsComponent;
  let fixture: ComponentFixture<UpdateCampaignDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCampaignDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCampaignDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
