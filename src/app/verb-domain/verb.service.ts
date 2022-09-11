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
