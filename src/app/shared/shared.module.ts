import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LimitCaractersPipe } from './pipes/limit-caracters.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LapicitoComponent } from './components/lapicito/lapicito.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LimitRankCaractersPipe } from './pipes/limit-rank-caracters.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LimitCaractersPipe,
    LimitRankCaractersPipe,
    LoaderComponent,
    LapicitoComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    LimitCaractersPipe,
    LimitRankCaractersPipe,
    LoaderComponent,
    LapicitoComponent,
  ],
})
export class SharedModule {}
