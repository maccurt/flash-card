import { Verb } from "../../verb-domain/state/verb.class.";
import { verbSelectors } from './../../verb-domain/state/verb.selectos';
import { verbActions } from './../../verb-domain/state/verb.actions';
import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-conjugation-list',
  templateUrl: './conjugation-list.component.html',
  styleUrls: ['./conjugation-list.component.scss']
})
export class ConjugationListComponent implements OnInit {

  verbList: Verb[] = [];
  constructor(private store: Store, private conjugateService: ConjugateService) { }

  ngOnInit(): void {

    this.store.dispatch(verbActions.loadVerbList());
    this.store.select(verbSelectors.getVerbListSelector).subscribe((verbList) => {
      this.verbList = verbList;
    });

  }
}
