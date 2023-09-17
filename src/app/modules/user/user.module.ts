import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbActiveModal,
  NgbModalModule,
  NgbTooltipConfig,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { CallbackComponent } from './callback/callback.component';
import { LoginComponent } from './login/login.component';
import { PreferenceComponent } from './preference/preference.component';
import { AvatarEditComponent } from './profile/avatar-edit/avatar-edit.component';
import { PortadaEditComponent } from './profile/portada-edit/portada-edit.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    PreferenceComponent,
    LoginComponent,
    ProfileComponent,
    CallbackComponent,
    ProfileEditComponent,
    AvatarEditComponent,
    PortadaEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModalModule,
    RouterModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  providers: [NgbActiveModal, NgbTooltipConfig],
})
export class UserModule {}
