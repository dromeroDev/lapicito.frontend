import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpaceDetailComponent } from './space-detail/space-detail.component';
import { SpaceCreateComponent } from './space-create/space-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpaceDetailComponent, SpaceCreateComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SpaceModule {}
