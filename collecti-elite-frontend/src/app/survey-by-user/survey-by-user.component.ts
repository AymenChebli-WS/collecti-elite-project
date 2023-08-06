import { Component, OnInit } from '@angular/core';
import { Survey } from '../survey.model';
import { SurveyService } from '../survey.service';
import { DatePipe } from '@angular/common';
import {MatSort, Sort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-by-user',
  templateUrl: './survey-by-user.component.html',
  styleUrls: ['./survey-by-user.component.css']
})
export class SurveyByUserComponent implements OnInit {
  userId!: number | null; // To store the user ID from local storage
  surveyList: Survey[] = [];
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'actions'];

  constructor(private surveyService: SurveyService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit() {
    this.userId = parseInt(localStorage.getItem('userId') || '', 10);

    if (this.userId) {
      this.surveyService.getSurveyListByUserId(this.userId).subscribe(
        (surveyList) => {
          this.surveyList = surveyList;
        },
        (error) => {
          console.log('Error fetching surveys', error);
        }
      );
    }
  }

  parseSurvey(schema: string): any {
    return JSON.parse(schema);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    return this.datePipe.transform(dateObj, 'dd-MM-yyyy') || '';
  }

  analyzeSurvey(surveyId: number) {
    // Navigate to the survey page with the surveyId as a parameter
    this.router.navigate(['/survey/analytics', surveyId]);
  }
}
