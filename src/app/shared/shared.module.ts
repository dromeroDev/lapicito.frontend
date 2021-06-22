import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LimitCaractersPipe } from './pipes/limit-caracters.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LimitCaractersPipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, LimitCaractersPipe],
})
export class SharedModule {}
