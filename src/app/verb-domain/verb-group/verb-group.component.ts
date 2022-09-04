import { VerbGroup } from './../types/VerbGroup';
import { Observable } from 'rxjs';
import { verbSelectors } from './../state/verb.selectos';
import { verbActions } from './../state/verb.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import verbGroupActions from '../state/verb-group.actions';
import verbGroupSelectors from '../state/verb-group-selectors';

@Component({
  selector: 'app-verb-group',
  templateUrl: './verb-group.component.html',
  styleUrls: ['./verb-group.component.scss']
})
export class VerbGroupComponent implements OnInit {
  verbGroup$!: Observable<VerbGroup | undefined>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(verbGroupActions.loadVerbGroupSelectedInRoute());
    this.verbGroup$ = this.store.select(verbGroupSelectors.getVerbGroup);
  }
}
