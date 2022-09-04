import { VerbGroupListComponent } from './verb-domain/verb-group-list/verb-group-list.component';

import { VerbListComponent } from './verb-domain/verb-list/verb-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConjugationListComponent } from './flash-card/conjugation-list/conjugation-list.component';
import { VerbComponent } from './verb-domain/verb/verb.component';
import { VerbGroupComponent } from './verb-domain/verb-group/verb-group.component';

const routes: Routes = [
  { path: 'home', component: VerbGroupListComponent },
  { path: 'verb-list', component: VerbListComponent },
  { path: 'verb-group-list', component: VerbGroupListComponent },
  { path: 'verb-group/:id', component: VerbGroupComponent },
  { path: 'verb/:verb', component: VerbComponent },
  { path: 'conjugation-list', component: ConjugationListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
