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

@NgModule({
  declarations: [
    RegisterComponent,
    PreferenceComponent,
    LoginComponent,
    ProfileComponent,
    CallbackComponent,
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    RouterModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
  providers: [NgbActiveModal, NgbTooltipConfig],
})
export class UserModule {}
