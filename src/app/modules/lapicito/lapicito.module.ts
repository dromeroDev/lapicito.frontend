import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LapicitoSuccessComponent } from './lapicito-success/lapicito-success.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LapicitoSuccessComponent],
  imports: [CommonModule, RouterModule],
})
export class LapicitoModule {}
