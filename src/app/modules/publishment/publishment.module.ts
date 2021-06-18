import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishmentDetailComponent } from './publishment-detail/publishment-detail.component';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PublishmentDetailComponent],
  imports: [CommonModule, RouterModule, NgbTooltipModule],
})
export class PublishmentModule {}
