import { Component, OnInit, Renderer2 } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey, SurveyResponse } from '../survey.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Model } from "survey-angular";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisualizationPanel } from 'survey-analytics';
import { saveAs } from 'file-saver';
// If using papaparse for CSV export
import * as Papa from 'papaparse';


@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.css']
})
export class SurveyAnalyticsComponent implements OnInit {
  surveyId!: number;
  survey!: Survey;
  surveyModel!: Model;
  responseList$: Observable<SurveyResponse[]> | undefined;
  respSchemaList: any[] = [];

  constructor(private renderer: Renderer2, private surveyService: SurveyService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.surveyId = +params['id'];
    });

    this.displayAnalytics();

  }

  parseSurvey(schema: string): any {
    return JSON.parse(schema);
  }

  exportCsv() {
    if (!this.respSchemaList.length) {
      return;
    }
    // Convert the data to CSV format
    const csvData = Papa.unparse(this.respSchemaList);
    // Create a Blob with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    // Save the Blob as a CSV file
    saveAs(blob, 'data.csv');
  }

  displayAnalytics() {
    if (this.surveyId) {
      this.surveyService.getSurveyById(this.surveyId).subscribe(
        (survey) => {
          this.survey = survey;
          const surveyC = new Model(survey.schema);
          // SurveyNG.render("surveyContainer", { model: surveyC });
          this.responseList$ = this.surveyService.getResponseListBySurveyId(this.surveyId);
          this.responseList$.pipe(
            map((responseList: SurveyResponse[]) => responseList.map(response => JSON.parse(response.responseSchema)))
          ).subscribe(
            (respSchemaList: any[]) => {
              this.respSchemaList = respSchemaList;
              console.log(respSchemaList);
              const vizPanelOptions = {
                allowHideQuestions: false
              }
              const vizPanel = new VisualizationPanel(
                surveyC.getAllQuestions(),
                respSchemaList,
                vizPanelOptions
              );
              vizPanel.render("surveyVizPanel");

              setTimeout(() => {
                const bannerElement = document.querySelector('.sa-commercial');
                if (bannerElement) {
                  this.renderer.removeChild(bannerElement.parentNode, bannerElement);
                }
              }, 0);
            },
            (error) => {
              console.log('Error fetching response list', error);
            }
          );
        },
        (error) => {
          console.log('Error fetching survey information', error);
        }
        );
      }
      
    }

}
