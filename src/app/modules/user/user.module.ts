import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PreferenceComponent } from './preference/preference.component';
import { LoginComponent } from './login/login.component';
import {
  NgbActiveModal,
  NgbModalModule,
  NgbTooltipConfig,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvatarEditComponent } from './profile/avatar-edit/avatar-edit.component';
import { PortadaEditComponent } from './profile/portada-edit/portada-edit.component';

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
