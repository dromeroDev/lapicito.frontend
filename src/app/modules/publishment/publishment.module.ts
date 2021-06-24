import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishmentDetailComponent } from './publishment-detail/publishment-detail.component';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ValorationCreateComponent } from './publishment-detail/valoration-create/valoration-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PublishmentDetailComponent, ValorationCreateComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgbTooltipModule],
})
export class PublishmentModule {}
