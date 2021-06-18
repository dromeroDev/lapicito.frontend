import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';
import { FeedComponent } from './modules/feed/feed.component';
import { HomeComponent } from './modules/home/home.component';
import { PublishmentDetailComponent } from './modules/publishment/publishment-detail/publishment-detail.component';
import { SpaceDetailComponent } from './modules/space/space-detail/space-detail.component';
import { PreferenceComponent } from './modules/user/preference/preference.component';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { RegisterComponent } from './modules/user/register/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'preference',
    component: PreferenceComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'user/:id',
    component: ProfileComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'publishment/:id',
    component: PublishmentDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'space/:id',
    component: SpaceDetailComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'callback',
    component: FeedComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
