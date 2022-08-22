import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Noun } from './noun-state/noun-reducer';

@Injectable({
  providedIn: 'root'
})
export class NounService {

  constructor(private httpClient: HttpClient) { }

  getNounList = (): Observable<Noun[]> => {

    return this.httpClient.get<Noun[]>('/json-data/verb-list.json');

  }
}
