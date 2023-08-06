import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';
import { Model, SurveyNG } from "survey-angular";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  survey!: Survey;
  surveyId!: number | null;
  surveyModel!: Model;

  constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.surveyId = +params['id'];
    });
    
    this.getSurveyInfo();
    // const surveySchema = this.survey.schema;
    // console.log("hello");
    // const jsonObject = JSON.parse(surveySchema);
    // const surveyC = new Model(jsonObject);
    // SurveyNG.render("surveyContainer", { model: surveyC });
    
  }

  
  getSurveyInfo() {
    if (this.surveyId) {
      this.surveyService.getSurveyById(this.surveyId).subscribe(
        (survey) => {
          this.survey = survey;
          const surveyC = new Model(survey.schema);
          SurveyNG.render("surveyContainer", { model: surveyC });
          surveyC.onComplete.add((sender: any) => {
            const participantId = Number(localStorage.getItem('userId'));
            const responseSchema = JSON.stringify(sender.data);
            const survId = this.surveyId;
            const data = { participantId, responseSchema, survId };
            this.surveyService.participateSurvey(data).subscribe(
              (response) => {
                this.router.navigate(['/survey/list']);
                this.showSnackbar('Thank you for your participation!');
              },
              (error) => {
                this.showSnackbar('Error! Try again later');
              }
            );
          });
        },
        (error) => {
          console.log('Error fetching survey information', error);
        }
        );
      }
    }
    
    private showSnackbar(message: string): void {
      this._snackBar.open(message, 'Close', {
        duration: 5000,
        verticalPosition: 'bottom',
      });
    }
  }
  