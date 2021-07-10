import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LapicitoSuccessComponent } from './lapicito-success/lapicito-success.component';
import { RouterModule } from '@angular/router';
import { LapicitoRecivedComponent } from './lapicito-recived/lapicito-recived.component';

@NgModule({
  declarations: [LapicitoSuccessComponent, LapicitoRecivedComponent],
  imports: [CommonModule, RouterModule],
})
export class LapicitoModule {}
