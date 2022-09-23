import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VerbGroup } from './types/VerbGroup.class';

@Injectable({
  providedIn: 'root'
})
export class VerbGroupService {

  constructor(private httpClient: HttpClient) { }

  getVerbGroup = (id: number): Observable<VerbGroup> => {
    return this.httpClient.get<VerbGroup>(`/json-data/verb-group-${id}`).pipe(
      map((verbGroup) => {

        //TODO
        //What do you want to do here?
        //why loop through every verb and that might not be used
        // make this verb specific not group specific
        //delete this code if need be
        

        return verbGroup;
      })
    );
  };
}