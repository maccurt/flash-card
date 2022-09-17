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
  sentenceList: Sentence[] = [];
  testId: string = '';

  constructor(private conjugationService: ConjugateService,
    private store: Store) { }

  ngOnInit(): void {
    if (this.tense) {
      //TODO Make this a pipe don't put in here
      const searchRegExp = /\s/g;
      this.testId = this.tense.text.replace(searchRegExp, '-').toLowerCase();
      this.sentenceList = this.getSentenceList(this.tense.firstPersonSingular);
    }
  }

  //todo can this be in the class
  getSentenceList = (tenseType: TenseType): Sentence[] => {
    if (tenseType && tenseType.sentenceList && tenseType.sentenceList.length > 0) {
      return tenseType.sentenceList;
    }
    return [];
  };

  pronounChanged = (event: any) => {
    let pronoun: PronounOption = parseInt(event.value);
    this.sentenceList = this.getPrononSentenceList(this.tense, pronoun);
  };

  getPrononSentenceList(tense: Tense, pronoun: PronounOption): Sentence[] {

    let sentenceList: Sentence[] = [];
    switch (pronoun) {
      case PronounOption.firstPersonSingular:
        sentenceList = this.getSentenceList(tense.firstPersonSingular);
        break;
      case PronounOption.firstPersonPlural:
        sentenceList = this.getSentenceList(tense.firstPersonPlural);
        break;
      case PronounOption.secondPersonSingular:
        sentenceList = this.getSentenceList(tense.secondPersonSingular);
        break;
      case PronounOption.secondPersonPlural:
        sentenceList = this.getSentenceList(tense.secondPersonPlural);
        break;
      case PronounOption.thirdPersonSingular:
        sentenceList = this.getSentenceList(tense.thirdPersonSingular);
        break;
      case PronounOption.thirdPersonPlural:
        sentenceList = this.getSentenceList(tense.thirdPersonPlural);
        break;

    }
    return sentenceList;

  };
}