import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishmentDetailComponent } from './publishment-detail/publishment-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PublishmentDetailComponent],
  imports: [CommonModule, RouterModule],
})
export class PublishmentModule {}
