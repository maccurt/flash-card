
import { VerbListComponent } from './verb-domain/verb-list/verb-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConjugationListComponent } from './flash-card/conjugation-list/conjugation-list.component';
import { VerbComponent } from './verb-domain/verb/verb.component';

const routes: Routes = [
  { path: 'home', component: VerbListComponent },
  { path: 'verb-list', component: VerbListComponent },
  { path: 'verb/:verb', component: VerbComponent },
  { path: 'conjugation-list', component: ConjugationListComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
