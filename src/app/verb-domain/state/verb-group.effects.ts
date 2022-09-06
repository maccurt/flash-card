import { verbGroupSelectors } from './verb-group.selectors';
import { map, mergeMap, switchMap } from 'rxjs';
import { verbGroupActions } from './verb-group.actions';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StemChangeType } from '../types/StemChangeType.enum';

@Injectable()
export class VerbGroupEffect {

    constructor(private actions$: Actions,
        private store: Store) {
    }

    loadVerbGroupSelectedInRoute$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbGroupActions.loadVerbGroupSelectedInRoute),
            switchMap(() => {

                return this.store.select(verbGroupSelectors.getVerbGroupFromRouteSelector).pipe(
                    map((verbGroup) => {       
                        //console.log('VerbGroupEffect',verbGroup);                 
                        if (verbGroup) {                            

                            verbGroup.verbList.forEach((verb)=>{

                                ///TODO not sure I want this here.
                                //My issue is this run every time.
                                if (verbGroup.presentTenseStemChangeType !== StemChangeType.none){
                                 verb.presentTense.stemChangeType = verbGroup.presentTenseStemChangeType;
                                }
                            })

                            return verbGroupActions.loadVerbGroupSuccess({ verbGroup });
                        }
                        let error = new Error('verb group not found from route');
                        return verbGroupActions.loadVerbGroupError({ error });

                    })
                );
            })
        );
    });
}