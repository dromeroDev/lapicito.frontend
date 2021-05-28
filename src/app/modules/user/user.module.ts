import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PreferenceComponent } from './preference/preference.component';
import { LoginComponent } from './login/login.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RegisterComponent,
    PreferenceComponent,
    LoginComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, NgbModalModule, RouterModule, ReactiveFormsModule],
  providers: [NgbActiveModal],
})
export class UserModule {}
