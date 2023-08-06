import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SurveyService } from '../survey.service';
import { Survey } from '../survey.model';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
  surveyList: Survey[] = [];
  dataSource: MatTableDataSource<Survey> = new MatTableDataSource<Survey>();
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'actions'];

  constructor(private surveyService: SurveyService, private _liveAnnouncer: LiveAnnouncer, private datePipe: DatePipe, private router: Router) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.surveyService.getSurveyList().subscribe((surveyList) => {
      this.surveyList = surveyList;
      this.dataSource = new MatTableDataSource(surveyList);
    });
  }

  parseSurvey(schema: string): any {
    return JSON.parse(schema);
  }

  formatDate(date: string): string {
    const dateObj = new Date(date);
    return this.datePipe.transform(dateObj, 'dd-MM-yyyy') || '';
  }

  participateSurvey(surveyId: number) {
    // Navigate to the survey page with the surveyId as a parameter
    this.router.navigate(['/survey/form', surveyId]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
