import { FlashCardModule } from './../flash-card/flash-card.module';
import { SharedModule } from './../shared/shared.module';
import { VerbEffect } from './state/verb.effectss';
import { verbReducer } from './state/verb.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VerbListComponent } from './verb-list/verb-list.component';

@NgModule({
  declarations: [
    VerbListComponent,    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlashCardModule,
    StoreModule.forFeature('verb', verbReducer),
    EffectsModule.forFeature([VerbEffect])    
  ]
})
export class VerbModule { }
