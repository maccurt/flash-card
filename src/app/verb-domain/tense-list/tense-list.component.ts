import { verbSelectors } from './../state/verb.selectos';
import { ConjugateService } from './../conjugate.service';
import { Verb } from './../types/verb.class.';
import { Component, Input, OnInit } from '@angular/core';
import { Tense } from '../types/Tense';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tense-list',
  templateUrl: './tense-list.component.html',
  styleUrls: ['./tense-list.component.scss']
})
export class TenseListComponent implements OnInit {

  verb?: Verb;
  tenseList!: Tense[];
  constructor(private store: Store,
    private conjugationService: ConjugateService) { }

  ngOnInit(): void {

    this.store.select(verbSelectors.getVerbSelector).subscribe((verb) => {

      if (verb) {
        this.tenseList = this.conjugationService.getTenselist(verb);
      }
    });
  }

}
