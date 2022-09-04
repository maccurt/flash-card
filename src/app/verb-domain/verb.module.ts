import { RouterModule } from '@angular/router';
import { FlashCardModule } from './../flash-card/flash-card.module';
import { SharedModule } from './../shared/shared.module';
import { VerbEffect } from './state/verb.effectss';
import { verbReducer } from './state/verb.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { VerbListComponent } from './verb-list/verb-list.component';
import { VerbComponent } from './verb/verb.component';
import { VerbGroupListComponent } from './verb-group-list/verb-group-list.component';
import { VerbGroupComponent } from './verb-group/verb-group.component';
import { VerbGroupEffect } from './state/verb-group.effects';

@NgModule({
  declarations: [
    VerbListComponent,
    VerbComponent,
    VerbGroupListComponent,
    VerbGroupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FlashCardModule,
    StoreModule.forFeature('verb', verbReducer),
    EffectsModule.forFeature([VerbEffect, VerbGroupEffect])
  ]
})
export class VerbModule { }
