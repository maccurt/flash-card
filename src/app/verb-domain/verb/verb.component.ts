import { verbSelectors } from './../state/verb.selectos';
import { verbActions } from './../state/verb.actions';
import { Observable } from 'rxjs';
import { Verb } from './../state/Verb';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.scss']
})
export class VerbComponent implements OnInit {
  verb$!: Observable<Verb | undefined>;

  constructor(private store: Store, private route: ActivatedRoute) {

    this.route.paramMap.subscribe((param) => {
      let verb = param.get('verb')?.toString();
      if (verb) {
        this.verb$ = this.store.select(verbSelectors.getVerbSelector(verb));
      }
    })
  }

  ngOnInit(): void {
  }

}
