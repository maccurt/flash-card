import { verbActions } from './../state/verb.actions';
import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './../state/verb.selectos';
import { Tense } from './../state/Verb';
import { Verb } from "../state/verb.class.";
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent {
  verb: Verb | undefined;
  tenseList: Tense[] = [];

  constructor(private store: Store,
    private route: ActivatedRoute, private conjugateService: ConjugateService) {

    this.route.paramMap.subscribe((param) => {

      this.store.dispatch(verbActions.loadVerb());
      this.store.select(verbSelectors.getVerbSelector()).subscribe((verb) => {
        this.verb = verb;
        
      });

    });
  }
}
