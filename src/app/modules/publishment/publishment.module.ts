import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishmentDetailComponent } from './publishment-detail/publishment-detail.component';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ValorationCreateComponent } from './publishment-detail/valoration-create/valoration-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublishmentCreateComponent } from './publishment-create/publishment-create.component';

@NgModule({
  declarations: [
    PublishmentDetailComponent,
    ValorationCreateComponent,
    PublishmentCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
  ],
})
export class PublishmentModule {}
