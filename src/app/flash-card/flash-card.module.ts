import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { ConjugationCardComponent } from './conjugation-card/conjugation-card.component';
import { ConjugationListComponent } from './conjugation-list/conjugation-list.component';
import { FromToCardComponent } from './from-to-card/from-to-card.component';

@NgModule({
  declarations: [
    FlashCardComponent,
    ConjugationCardComponent,
    ConjugationListComponent,
    FromToCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FlashCardComponent,
    ConjugationCardComponent
  ]
})
export class FlashCardModule { }
