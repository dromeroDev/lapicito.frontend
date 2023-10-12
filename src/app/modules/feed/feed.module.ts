import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {
  NgbCarouselModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RankingTopComponent } from './ranking-top/ranking-top.component';

@NgModule({
  declarations: [FeedComponent, RankingTopComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    NgbTooltipModule,
    NgbCarouselModule,
  ],
})
export class FeedModule {}
