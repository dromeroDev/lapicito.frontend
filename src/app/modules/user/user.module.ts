import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { PreferenceComponent } from './preference/preference.component';

@NgModule({
  declarations: [RegisterComponent, PreferenceComponent],
  imports: [CommonModule],
})
export class UserModule {}
