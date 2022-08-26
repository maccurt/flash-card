import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './../state/verb.selectos';
import { Observable } from 'rxjs';
import { Verb, Tense } from './../state/Verb';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {
  verb: Verb | undefined
  tenseList: Tense[] = [];

  constructor(private store: Store,
    private route: ActivatedRoute, private conjugateService: ConjugateService) {

    this.route.paramMap.subscribe((param) => {
      //CAN THIS BE IN THE EFFECT?
      let verbRouteParam = param.get('verb')?.toString();
      if (verbRouteParam) {
        this.store.select(verbSelectors.getVerbSelector(verbRouteParam)).subscribe((verb) => {

          //move all this code into an effect/etc.. NGRX IT
          if (verb) {
            this.tenseList.push(this.conjugateService.getPresentTense(verb));
            this.tenseList.push(this.conjugateService.getPreteriteTense(verb));
          }
          this.verb = verb
        })
      }
    })
  }

  ngOnInit(): void {
  }

}
