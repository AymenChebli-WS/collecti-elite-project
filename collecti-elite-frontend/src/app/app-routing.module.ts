import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthRedirectGuardService } from './auth-redirect-guard.service';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyAnalyticsComponent } from './survey-analytics/survey-analytics.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: UserRegisterComponent, canActivate: [AuthRedirectGuardService] },
  { path: 'login', component: UserLoginComponent, canActivate: [AuthRedirectGuardService] },
  { path: 'nav', component: NavigationComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'survey/create', component: SurveyCreateComponent, canActivate: [AuthGuardService] },
  { path: 'survey/form/:id', component: SurveyFormComponent, canActivate: [AuthGuardService] },
  { path: 'survey/list', component: SurveyListComponent, canActivate: [AuthGuardService] },
  { path: 'survey/analytics/:id', component: SurveyAnalyticsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
