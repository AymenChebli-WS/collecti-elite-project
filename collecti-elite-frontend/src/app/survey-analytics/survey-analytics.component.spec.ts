import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnalyticsComponent } from './survey-analytics.component';

describe('SurveyAnalyticsComponent', () => {
  let component: SurveyAnalyticsComponent;
  let fixture: ComponentFixture<SurveyAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyAnalyticsComponent]
    });
    fixture = TestBed.createComponent(SurveyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
