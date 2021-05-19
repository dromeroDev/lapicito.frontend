import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceComponent } from './space.component';
import { RouterModule } from '@angular/router';
import { SpaceDetailComponent } from './space-detail/space-detail.component';

@NgModule({
  declarations: [SpaceComponent, SpaceDetailComponent],
  imports: [CommonModule, RouterModule],
})
export class SpaceModule {}
