import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Verb } from './state/Verb';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  constructor(private httpClient: HttpClient) { }
  getVerbList = (): Observable<Verb[]> => {
    return this.httpClient.get<Verb[]>('/json-data/verb-list.json');
  };
}
