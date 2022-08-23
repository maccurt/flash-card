import { ConjugateService } from './../conjugate.service';
import { verbActions } from './../state/verb.actions';
import { verbSelectors } from './../state/verb.selectos';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tense, FromTo, Verb } from '../state/Verb';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss']
})
export class VerbListComponent implements OnInit {
  verbList: Verb[] = [];
  fromTo!: FromTo;
  showTo: boolean = false;
  // tense!: Tense | null;

  presentTense!: Tense | null;
  pastTense!: Tense | null;
  sentence!: FromTo | null;
  showSentence: boolean = false;
  sentenceList: FromTo[] = [];
  constructor(private store: Store,
    private conjugationService: ConjugateService

  ) { }

  ngOnInit(): void {

    this.store.dispatch(verbActions.loadVerbList());

    this.store.select(verbSelectors.getVerbListSelector).subscribe((verbList) => {
      if (verbList.length > 0) {
        this.verbList = verbList;
        this.flashToFromList([...this.verbList]);
      }

    });
  }

  flashToFromList = (verbList: Verb[]) => {

    //TODO Should this shuffle be somewhere else?
    //toFromList.sort(() => Math.random() - 0.5)
    //We create function that returns a new promise

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const waitTime = 3000;

    const loop = async () => {
      for (const verb of verbList) {

        this.fromTo = verb;
        this.presentTense = this.conjugationService.getPresentTense(verb);

        this.pastTense = this.conjugationService.getPastTense(this.fromTo.to);

        //TODO this is hack fix this
        this.sentence = null;
        if (verb.presentTense && verb.presentTense.fistPersonSingular && verb.presentTense.fistPersonSingular.sentenceList) {
          if (verb.presentTense.fistPersonSingular.sentenceList.length > 0) {
            this.sentence = verb.presentTense.fistPersonSingular.sentenceList[0];
            this.sentenceList = verb.presentTense.fistPersonSingular.sentenceList;
          }
        }

        this.showTo = false;

        //Show the to version
        await wait(waitTime);
        this.showTo = true;

        //Wait to rotate to next verb
        await wait(waitTime + 8000);
        //TODO FIX THIS don't want to use hide the thing
        //this should be hide the
        this.presentTense = null;
      }
    };
    loop();

  };
}
