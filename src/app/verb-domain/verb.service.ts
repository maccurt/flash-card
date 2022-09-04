import { VerbGroup } from "./types/VerbGroup";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Verb } from "./types/verb.class.";

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private httpClient: HttpClient) { }

  getVerbList = (): Observable<Verb[]> => {
    return this.httpClient.get<Verb[]>('/json-data/verb-list.json');
  };

  getVerbGroupList = (): Observable<VerbGroup[]> => {
    return this.httpClient.get<VerbGroup[]>('/json-data/verb-group-list.json');
  };
}
