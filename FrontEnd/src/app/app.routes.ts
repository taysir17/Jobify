import { Routes } from '@angular/router';
import { AppNotificationsComponent } from './components/RecruiterNotificationComp/app-notifications/app-notifications.component';
import { CandidateInfoComponent } from './components/RecruiterNotificationComp/candidate-info/candidate-info.component';
import { MatchesComponentComponent } from './components/matches_component/matches_component.component';
import { RecommendedCandidatesComponent } from './components/recommendedCandidatesPage/recommended-candidates/recommended-candidates.component';
import { JobDetailComponent } from './components/AllJobs/job-detail/job-detail.component';
import { AllJobsComponent } from './components/AllJobs/all-jobs/all-jobs.component';
import { NewJobFormComponent } from './components/new-job-form/new-job-form.component';
import { AccueilComponent } from './components/landing page/accueil/accueil.component';
import { LoginCompComponent } from './components/AuthComponents/login-comp/login-comp.component';
import { SignUpCompComponent } from './components/AuthComponents/sign-up-comp/sign-up-comp.component';
import { HomeComponent } from './components/landing page/home/home.component';
import { AllExpiredJobsComponent } from './components/expiredJobs/all-expired-jobs/all-expired-jobs.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/guard/auth.guard';
import { MyJobOfferListComponent } from './components/Recruiter/my-job-offer-list/my-job-offer-list.component';
import { AppliedCandidatesrListComponent } from './components/Recruiter/applied-candidatesr-list/applied-candidatesr-list.component';
import { CandidateCVDisplayComponent } from './components/Recruiter/candidateCVDisplay/candidate-cvdisplay.component';

import { ApplicationsListComponent } from './components/Candidate/applications-list/applications-list.component';
import { ProfileComponent } from './components/Candidate/profile/profile.component';
import { RoleGuard } from './services/guard/role.guard';
import { RecommandedCandidateComponent } from './components/Recruiter/recommanded-candidate/recommanded-candidate.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AccueilComponent },
      {
        path: 'matches',
        component: MatchesComponentComponent,
        canActivate: [AuthGuard],
      },
      { path: 'recommendation', component: RecommendedCandidatesComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'uploadCV/:id', component: UserProfileComponent,canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'jobs', component: AllJobsComponent },
      { path: 'candidateApplication', component: ApplicationsListComponent,canActivate:[AuthGuard] },
      { path: 'jobDetails/:id', component: JobDetailComponent, canActivate:[AuthGuard] },
      { path: 'recruiterJobOfferList', component: MyJobOfferListComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'appliedCandidatesList', component: AppliedCandidatesrListComponent, canActivate:[AuthGuard, RoleGuard] },
      { path: 'displayCV/:id', component:CandidateCVDisplayComponent , canActivate:[AuthGuard]},
      {
        path: 'newJob',
        component: NewJobFormComponent,
        canActivate: [AuthGuard, RoleGuard],
      },
      {
        path: 'editJob/:id',
        component: NewJobFormComponent,
        canActivate: [AuthGuard],
      },
      { path: 'expired/:id', component: AllExpiredJobsComponent,canActivate: [AuthGuard, RoleGuard] },
      { path: 'recommandedCandidates', component: RecommandedCandidateComponent ,canActivate: [AuthGuard, RoleGuard] },
    ],
  },
  { path: 'signup', component: SignUpCompComponent },
  { path: 'login', component: LoginCompComponent },
  { path: '**', redirectTo: '' },
  // Redirect default route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
