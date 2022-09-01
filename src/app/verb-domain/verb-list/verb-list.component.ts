import { FromTo } from './../state/Verb';
import { ConjugateService } from './../conjugate.service';
import { verbActions } from './../state/verb.actions';
import { verbSelectors } from './../state/verb.selectos';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Tense } from '../state/Verb';
import { Verb } from "../state/verb.class.";

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss']
})
export class VerbListComponent implements OnInit {
  verbList: Verb[] = [];
  verb!: Verb;
  showTranslation: boolean = false;

  presentTense!: Tense | null;
  preteriteTense!: Tense | null;
  sentence!: FromTo | null;
  showSentence: boolean = false;
  sentenceList: FromTo[] = [];
  constructor(private store: Store,
    private conjugationService: ConjugateService

  ) { }

  ngOnInit(): void {

    this.store.select(verbSelectors.getVerbListSelector).subscribe((verbList) => {
      if (verbList.length > 0) {
        this.verbList = verbList;
        //toFromList.sort(() => Math.random() - 0.5)        
        this.flashToFromList([...this.verbList]);
      }

    });
  }

  flashToFromList = (verbList: Verb[]) => {

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const waitTime = 3000;

    const loop = async () => {
      for (const verb of verbList) {

        //baseline
        this.verb = verb;
        this.presentTense = null;
        this.showTranslation = false;

        this.presentTense = this.conjugationService.getPresentTense(verb);
        //TOOO fix this so it uses the a non string version
        this.preteriteTense = this.conjugationService.getPreteriteTense(verb);

        this.sentence = null;
        if (verb.presentTense && verb.presentTense.fistPersonSingular && verb.presentTense.fistPersonSingular.sentenceList) {
          if (verb.presentTense.fistPersonSingular.sentenceList.length > 0) {
            this.sentence = verb.presentTense.fistPersonSingular.sentenceList[0];
            this.sentenceList = verb.presentTense.fistPersonSingular.sentenceList;
          }
        }

        //show the translation
        await wait(waitTime);
        this.showTranslation = true;

        //Wait to rotate to next verb
        await wait(waitTime + 8000);

      }
    };
    loop();

  };
}