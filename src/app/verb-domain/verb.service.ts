import { Sentence, Paragraph } from './types/Sentence';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StemChangeType } from './types/StemChangeType.enum';
import { Verb } from "./types/verb.class.";
import { VerbGroup } from './types/VerbGroup.class';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private httpClient: HttpClient) { }

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

  getSentenceListFromParagraph = (paragraph: Paragraph): Sentence[] => {

    let sentenceList: Sentence[] = [];
    const englishList = this.getSetenceListFromStringParagraph(paragraph.english);
    const spanishList = this.getSetenceListFromStringParagraph(paragraph.spanish);
    for (let i = 0; i < englishList.length; i++) {
      sentenceList.push({ english: englishList[i], spanish: spanishList[i] })
    }
    return sentenceList;
  };

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
