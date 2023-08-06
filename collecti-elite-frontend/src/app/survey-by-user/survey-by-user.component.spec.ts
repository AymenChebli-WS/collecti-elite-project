import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyByUserComponent } from './survey-by-user.component';

describe('SurveyByUserComponent', () => {
  let component: SurveyByUserComponent;
  let fixture: ComponentFixture<SurveyByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveyByUserComponent]
    });
    fixture = TestBed.createComponent(SurveyByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
