import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './modules/feed/feed.component';
import { HomeComponent } from './modules/home/home.component';
import { PostDetailComponent } from './modules/post/post-detail/post-detail.component';
import { SpaceDetailComponent } from './modules/space/space-detail/space-detail.component';
import { SpaceComponent } from './modules/space/space.component';
import { PreferenceComponent } from './modules/user/preference/preference.component';
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
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'publishment/:id',
    component: PostDetailComponent,
  },
  {
    path: 'space',
    component: SpaceComponent,
  },
  {
    path: 'space/:id',
    component: SpaceDetailComponent,
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
