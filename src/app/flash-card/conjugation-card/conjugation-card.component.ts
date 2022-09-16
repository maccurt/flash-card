import { PronounOption } from 'src/app/verb-domain/types/PronounOption.interface';
import { TenseType } from './../../verb-domain/types/TenseType';
import { Sentence } from './../../verb-domain/types/Sentence';
import { ConjugateService } from './../../verb-domain/conjugate.service';
import { Component, Input, OnInit } from '@angular/core';
import { Tense } from 'src/app/verb-domain/types/Tense';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-conjugation-card',
  templateUrl: './conjugation-card.component.html',
  styleUrls: ['./conjugation-card.component.scss']
})
export class ConjugationCardComponent implements OnInit {
  @Input() header!: string | null | undefined;
  @Input() tense!: Tense;
  pronounOption: string = '1';
  sentence?: Sentence;
  testId: string = '';

  constructor(private conjugationService: ConjugateService,
    private store: Store) { }

  ngOnInit(): void {
    if (this.tense) {
      //TODO Make this a pipe don't put in here
      const searchRegExp = /\s/g;
      this.testId = this.tense.text.replace(searchRegExp, '-').toLowerCase();
      this.sentence = this.getSentence(this.tense.firstPersonSingular);
    }
  }

  //todo can this be in the class
  getSentence = (tenseType: TenseType): Sentence | undefined => {
    if (tenseType && tenseType.sentenceList && tenseType.sentenceList.length > 0) {
      return tenseType.sentenceList[0];
    }
    return undefined;
  };


  //TODO Pronnoun changed fix this
  tenseChanged = (event: any) => {

    let pronoun: PronounOption = parseInt(event.value);
    switch (pronoun) {

      case PronounOption.firstPersonSingular:
        this.sentence = this.getSentence(this.tense.firstPersonSingular);
        break;
      default:
        this.sentence = undefined;
    }

    console.log(this.sentence);

  };
}