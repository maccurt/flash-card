import { verbActions } from './../state/verb.actions';
import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './../state/verb.selectos';
import { Verb, Tense } from './../state/Verb';
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

      //TODO CAN THIS BE IN THE EFFECT?
      let verbRouteParam = param.get('verb')?.toString();

      if (verbRouteParam) {

        this.store.dispatch(verbActions.loadVerb({ verb: verbRouteParam }));
        this.store.select(verbSelectors.getVerbSelector()).subscribe((verb) => {

          if (verb) {
            this.verb = verb;
            this.tenseList.push(this.verb.presentTense);
            this.tenseList.push(this.verb.preteriteTense);
          }
        });

      }
    });
  }
}
