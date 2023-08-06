import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../survey.service';
import { Router } from '@angular/router';
import { SurveyCreatorModel } from "survey-creator-core";
import { SurveyCreator } from "survey-creator-knockout";
import { MatSnackBar } from '@angular/material/snack-bar';

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false
};

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {
  
  surveyCreatorModel!: SurveyCreatorModel;
  userId!: number | null;

  constructor(private renderer: Renderer2, private surveyService: SurveyService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    const creator = new SurveyCreator(creatorOptions);
    creator.render("surveyCreator");
    // this.surveyCreatorModel = creator;

    creator.saveSurveyFunc = (saveNo: number, callback: Function) => {
      callback(saveNo, true);
      
      // If you use a web service:
      const creatorId = Number(localStorage.getItem('userId'));
      const surveySchema = creator.text;
      const data = { creatorId, surveySchema };
      this.surveyService.createSurvey(data).subscribe(
        (response) => {
          this.router.navigate(['/survey/list']);
          this.showSnackbar('Survey has been created!');
        },
        (error) => {
          this.showSnackbar('Error! Try again later');
        }
      );
      
    };

    setTimeout(() => {
    const bannerElement = document.querySelector('.svc-creator__banner');
    if (bannerElement) {
      this.renderer.removeChild(bannerElement.parentNode, bannerElement);
    }
  }, 0);
}

private showSnackbar(message: string): void {
  this._snackBar.open(message, 'Close', {
    duration: 5000,
    verticalPosition: 'bottom',
  });
}
  
}

// If you use a web service:
function saveSurveyJson(url: string, json: any, saveNo: number, callback: any) {
  const request = new XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.addEventListener('load', () => {
    callback(saveNo, true);
  });
  request.addEventListener('error', () => {
    callback(saveNo, false);
  });
  request.send(JSON.stringify(json));
}