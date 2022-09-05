import { verbSelectors } from './../state/verb.selectos';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Verb } from '../types/verb.class.';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.scss']
})
export class SentenceComponent implements OnInit {

  verb$?: Observable<Verb | undefined>;

  constructor(private store: Store) { }

  ngOnInit(): void {

    this.verb$ = this.store.select(verbSelectors.getVerbSelector);

  }

}
