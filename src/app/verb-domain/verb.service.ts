import { ConjugateService } from './conjugate.service';
import { TenseType } from './types/TenseType';
import { Sentence, Paragraph } from './types/Sentence';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, filter, find, switchMap } from 'rxjs';
import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from "./types/verb.class.";
import { VerbGroup } from './types/VerbGroup.class';
import { Tense } from './types/Tense';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private httpClient: HttpClient, private conjugateService: ConjugateService) { }

  getVerbList = (): Observable<Verb[]> => {
    return this.httpClient.get<Verb[]>('/json-data/verb-list.json');
  };

  getVerbGroupList = (): Observable<VerbGroup[]> => {
    return this.httpClient.get<VerbGroup[]>('/json-data/verb-group-list.json')
      .pipe(map((verbGroupList) => {
        verbGroupList.forEach((verbGroup) => {
          this.setVerbGroupOverride(verbGroup);
        });
        return verbGroupList;
      }));
  };

  setTenseTypeSentence = (sentence: Sentence, tenseType: TenseType): void => {
    if (tenseType.text) {
      let spanish = sentence.spanish.toLowerCase();
      if (new RegExp(`\\b${tenseType.text.toLowerCase()}\\b`).test(spanish)) {
        tenseType.sentenceList.push(sentence);
      }
    }
  }


  setAllSentenceTenseFromParagraph = (verb: Verb): void =>{

    //TODO in future find a way to use a loop to get all tenses
    //As you add more tenses you have to remember to add code here
    //bad idea.
    this.setTenseSentenceX(verb.presentTense);
    this.setTenseSentenceX(verb.preteriteTense);
  }

  setTenseSentenceX = (tense: Tense): void => {

    if (tense.paragraph) {
      let sentenceList = this.getSentenceListFromParagraph(tense.paragraph);
      if (sentenceList && sentenceList.length > 0) {
        this.setTenseSentence(sentenceList, tense);
      }
    }
  }

  setTenseSentence = (sentenceList: Sentence[], tense: Tense): void => {
    sentenceList.forEach((s) => {
      //1st
      this.setTenseTypeSentence(s, tense.firstPersonSingular)
      this.setTenseTypeSentence(s, tense.firstPersonPlural);
      //2nd
      this.setTenseTypeSentence(s, tense.secondPersonSingular);
      this.setTenseTypeSentence(s, tense.secondPersonPlural);
      //3rd
      this.setTenseTypeSentence(s, tense.thirdPersonSingular);
      this.setTenseTypeSentence(s, tense.thirdPersonPlural);
    })
  }

  getSentenceListFromParagraph = (paragraph: Paragraph): Sentence[] => {

    let sentenceList: Sentence[] = [];
    const englishList = this.getSetenceListFromStringParagraph(paragraph.english);
    const spanishList = this.getSetenceListFromStringParagraph(paragraph.spanish);
    for (let i = 0; i < englishList.length; i++) {
      sentenceList.push({ english: englishList[i], spanish: spanishList[i] })
    }
    return sentenceList;
  };

  getSetenceListFromStringParagraph = (paragraph: string): string[] => {

    let sentenceList: string[] = [];
    const sentenceSplitList = paragraph.split(/[.!?]+/).filter(function (el) { return el.length != 0 });

    //TODO is there a REGEX way to do this. ask on stack overflow
    for (let i = 0; i < sentenceSplitList.length; i++) {
      let sentence = sentenceSplitList[i];

      let index = paragraph.indexOf(sentence);
      sentence = paragraph.substring(index, sentence.length + index + 1).trim()
      sentenceList.push(sentence)
    }

    return sentenceList;
  }

  setVerbGroupOverride = (verbGroup: VerbGroup): void => {

    if (!verbGroup.override) {
      return;
    }

    //TODO as you add more re-think this only loop once
    if (verbGroup.override.presentTenseStemChangeType !== StemChangeType.none) {
      verbGroup.verbList.forEach((verb) => {
        verb.presentTense.stemChangeType = verbGroup.override.presentTenseStemChangeType;
      });
    }
  };
}
