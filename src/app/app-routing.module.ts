import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContributeComponent } from './pages/projects/contribute/contribute.component';
import { PaymentChoicesComponent } from './pages/projects/payment-choices/payment-choices.component';
import { ShippingAddressComponent } from './pages/projects/shipping-address/shipping-address.component';
import { CampaignDetailsComponent } from './pages/create/steps/campaign-details/campaign-details.component';
import { ProjectSummaryComponent } from './pages/create/steps/project-summary/project-summary.component';
import { DetailedDescriptionComponent } from './pages/create/steps/detailed-description/detailed-description.component';
import { RewardsComponent } from './pages/create/steps/rewards/rewards.component';
import { AddRewardComponent } from './pages/create/steps/rewards/add-reward/add-reward.component';
import { MeansOfPaymentComponent } from './pages/create/steps/means-of-payment/means-of-payment.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';



import { AuthGuard } from '../app/guards/auth/auth.guard';
import { UpdateCampaignDetailsComponent } from './pages/create/steps/campaign-details/update-campaign-details/update-campaign-details.component';
import { UpdateRewardsComponent } from './pages/create/steps/rewards/update-rewards/update-rewards.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProjectInProgressComponent } from './pages/admin/project-in-progress/project-in-progress.component';
import { ProjectInVerificationComponent } from './pages/admin/project-in-verification/project-in-verification.component';
import { ShowProjectDetailsValidComponent } from './pages/admin/project-in-progress/show-project-details/show-project-details.component';
import { ShowProjectDetailsComponent } from './pages/admin/project-in-verification/show-project-details/show-project-details.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MyAccountComponent } from './pages/auth/my-account/my-account.component';
import { ViewByOwnerComponent } from './pages/projects/view-by-owner/view-by-owner.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { ShowUserDetailsComponent } from './pages/admin/user-list/show-user-details/show-user-details.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { MyContributionComponent } from './pages/auth/my-account/my-contribution/my-contribution.component';
import { SettingsComponent } from './pages/auth/my-account/settings/settings.component';
import { MyProjectsComponent } from './pages/auth/my-account/my-projects/my-projects.component';



const routes: Routes = [
  { path:  '', component: HomeComponent },
  { path:  'login', component: LoginComponent ,},
  { path:  'signup', component: RegisterComponent },
  { path:  'myaccount', 
  component: MyAccountComponent,
  children: [
    {
      path: 'contributions',
      component: MyContributionComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'projects',
      component: MyProjectsComponent
    },

  ]
  },
  { path:  'create', component: CreateComponent },
  { path:  'discover', component: DiscoverComponent },
  { path:  'payment-choices/:id', component: PaymentChoicesComponent },
  { path:  'projects/:id', component: ProjectsComponent },
  { path:  'project/:id', component: ProjectComponent},
  { path:  'view/:id', component: ViewByOwnerComponent },
  { path:  'steps/campaign-details', component: CampaignDetailsComponent, canActivate: [AuthGuard]},
  { path:  'steps/campaign-details/update', component: UpdateCampaignDetailsComponent, canActivate: [AuthGuard]},
  { path:  'steps/project-summary/:id', component: ProjectSummaryComponent },
  // { path:  'steps/project-summary/update', component: UpdateProjectSummaryComponent },
  { path:  'steps/detailed-description/:id', component: DetailedDescriptionComponent },
  // { path:  'steps/detailed-description/update', component: UpdateDetailedDescriptionComponent },
  { path:  'steps/rewards/:id', component: RewardsComponent },
  { path:  'steps/rewards/add/:id', component: AddRewardComponent },
  { path:  'steps/rewards/update/:id', component: UpdateRewardsComponent },
  { path:  'steps/means-of-payment/:id', component: MeansOfPaymentComponent},

  
  { 
    path:  'admin', 
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'project-in-progress',
        component: ProjectInProgressComponent
      },
      {
        path: 'project-in-progress/:id',
        component: ShowProjectDetailsValidComponent
      },  
      {
        path: 'project-in-verification',
        component: ProjectInVerificationComponent
      },  
      {
        path: 'project-in-verification/:id',
        component: ShowProjectDetailsComponent
      },  
      {
        path: 'user-list',
        component: UserListComponent
      },  
      {
        path: 'user-list/:id',
        component: ShowUserDetailsComponent
      }
  ]
  },
  // { path:  'steps/means-of-payment/update', component: UpdateMeansOfPaymentComponent},
  { path:  'contribute/:id', component: ContributeComponent },
  { path:  '**', redirectTo:  '', pathMatch:  'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
