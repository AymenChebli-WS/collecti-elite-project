import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey, SurveyResponse } from './survey.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  
  constructor(private http: HttpClient) {}
  
  private createSurveyUrl = 'http://127.0.0.1:8000/create-survey';
  createSurvey(data: any) {
    return this.http.post(this.createSurveyUrl, data);
  }

  private surveyInfoUrl = 'http://127.0.0.1:8000/survey-info';
  getSurveyById(surveyId: number): Observable<Survey> {
    return this.http.get<Survey>(`${this.surveyInfoUrl}/${surveyId}`);
  }

  private surveyListUrl = 'http://127.0.0.1:8000/survey-list';
  getSurveyList(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.surveyListUrl);
  }

  private surveyListByUser = 'http://127.0.0.1:8000/survey-list-user';
  getSurveyListByUserId(userId: number): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.surveyListByUser}/${userId}`);
  }

  private participateSurveyUrl = 'http://127.0.0.1:8000/participate-survey';
  participateSurvey(data: any) {
    return this.http.post(this.participateSurveyUrl, data);
  }

  private responseListBySurvey = 'http://127.0.0.1:8000/response-list-survey';
  getResponseListBySurveyId(surveyId: number): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`${this.responseListBySurvey}/${surveyId}`);
  }
}
