import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpaceDetailComponent } from './space-detail/space-detail.component';
import { SpaceCreateComponent } from './space-create/space-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SpaceDetailComponent, SpaceCreateComponent],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
})
export class SpaceModule {}
