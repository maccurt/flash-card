import { verbActions } from './../state/verb.actions';
import { Tense } from 'src/app/verb-domain/types/Tense';
import { ConjugateService } from './../conjugate.service';
import { Verb } from './../types/verb.class.';
import { VerbGroup } from './../types/VerbGroup';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import verbGroupActions from '../state/verb-group.actions';
import verbGroupSelectors from '../state/verb-group.selectors';

@Component({
  selector: 'app-verb-group',
  templateUrl: './verb-group.component.html',
  styleUrls: ['./verb-group.component.scss']
})
export class VerbGroupComponent implements OnInit {
  verbGroup$!: Observable<VerbGroup | undefined>;
  verb!: Verb;
  chosenIndex = 1
  constructor(private store: Store,
    private conjugationService: ConjugateService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(verbGroupActions.loadVerbGroupSelectedInRoute());
    this.verbGroup$ = this.store.select(verbGroupSelectors.getVerbGroup);

    this.verbGroup$.subscribe((vg) => {
      if (vg?.verbList) {
        this.verbClick(vg?.verbList[0], 0);
      }

    });
  }

  verbClick = (verb: Verb, index: number) => {
    this.chosenIndex = index;
    this.verb = verb;
    this.store.dispatch(verbActions.setVerb({ verb }));
  };
}
