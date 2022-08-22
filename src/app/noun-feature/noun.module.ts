import { HttpClientModule } from '@angular/common/http';
import { NounEffect } from './noun.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { nounReducer } from './noun-state/noun-reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('noun', nounReducer),
    EffectsModule.forFeature([NounEffect])
  ]
})
export class NounModule { }
