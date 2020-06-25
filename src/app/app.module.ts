import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { EmbedVideo } from 'ngx-embed-video';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import fr from '@angular/common/locales/fr';

//Component

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContributeComponent } from './pages/projects/contribute/contribute.component';
import { ShippingAddressComponent } from './pages/projects/shipping-address/shipping-address.component';
import { PaymentChoicesComponent } from './pages/projects/payment-choices/payment-choices.component';
import { CampaignDetailsComponent } from './pages/create/steps/campaign-details/campaign-details.component';
import { ProjectSummaryComponent } from './pages/create/steps/project-summary/project-summary.component';
import { DetailedDescriptionComponent } from './pages/create/steps/detailed-description/detailed-description.component';
import { RewardsComponent } from './pages/create/steps/rewards/rewards.component';
import { MeansOfPaymentComponent } from './pages/create/steps/means-of-payment/means-of-payment.component';
import { ProjectComponent } from './pages/projects/project/project.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AddRewardComponent } from './pages/create/steps/rewards/add-reward/add-reward.component';

// Providers

import { TranslateProvider, AuthService } from './providers';
import { httpInterceptorProviders } from './http-interceptors/index';
import { UpdateCampaignDetailsComponent } from './pages/create/steps/campaign-details/update-campaign-details/update-campaign-details.component';
import { UpdateRewardsComponent } from './pages/create/steps/rewards/update-rewards/update-rewards.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ProjectInProgressComponent } from './pages/admin/project-in-progress/project-in-progress.component';
import { ProjectInVerificationComponent } from './pages/admin/project-in-verification/project-in-verification.component';
import { ShowProjectDetailsValidComponent } from './pages/admin/project-in-progress/show-project-details/show-project-details.component';
import { ShowProjectDetailsComponent } from './pages/admin/project-in-verification/show-project-details/show-project-details.component';
import { MyAccountComponent } from './pages/auth/my-account/my-account.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MenuBarComponent } from './pages/menu-bar/menu-bar.component';
import { ViewByOwnerComponent } from './pages/projects/view-by-owner/view-by-owner.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { ShowUserDetailsComponent } from './pages/admin/user-list/show-user-details/show-user-details.component';
import { DiscoverComponent } from './pages/discover/discover.component';
import { MyContributionComponent } from './pages/auth/my-account/my-contribution/my-contribution.component';
import { SettingsComponent } from './pages/auth/my-account/settings/settings.component';
import { MyProjectsComponent } from './pages/auth/my-account/my-projects/my-projects.component';
import { FooterComponent } from './pages/footer/footer.component';


registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    CreateComponent,
    ProjectsComponent,
    ContributeComponent,
    ShippingAddressComponent,
    PaymentChoicesComponent,
    CampaignDetailsComponent,
    ProjectSummaryComponent,
    DetailedDescriptionComponent,
    RewardsComponent,
    MeansOfPaymentComponent,
    ProjectComponent,
    LoginComponent,
    RegisterComponent,
    AddRewardComponent,
    UpdateCampaignDetailsComponent,
    UpdateRewardsComponent,
    DashboardComponent,
    ProjectInProgressComponent,
    ProjectInVerificationComponent,
    ShowProjectDetailsValidComponent,
    ShowProjectDetailsComponent,
    MyAccountComponent,
    MenuBarComponent,
    ViewByOwnerComponent,
    UserListComponent,
    ShowUserDetailsComponent,
    DiscoverComponent,
    MyContributionComponent,
    SettingsComponent,
    MyProjectsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EmbedVideo.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    TranslateProvider,
    AuthService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
