import { verbGroupSelectors } from './verb-group.selectors';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { verbGroupActions } from './verb-group.actions';
import { ofType } from '@ngrx/effects';
import { createEffect } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { StemChangeType } from '../types/StemChangeType.enum';
import { VerbService } from '../verb.service';

@Injectable()
export class VerbGroupEffect {

    constructor(private actions$: Actions,
        private verbService: VerbService,
        private store: Store) {
    }

    loadVerbGroupList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbGroupActions.loadVerbGroupList),
            mergeMap(() => this.verbService.getVerbGroupList()
                .pipe(
                    map(verbGroupList => verbGroupActions.loadVerbGroupListSuccess({ verbGroupList }))
                )),
            catchError(error => of(verbGroupActions.loadVerbGroupListError({ error })))
        );
    });

    setVerbGroupSelected$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbGroupActions.setVerbGroupSelected),
            switchMap(({ verbGroup }) => {
                return of(verbGroupActions.setVerbGroupSelectedSuccess({ verbGroup }));
            })
        );
    });

    loadVerbGroupSelectedInRoute$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbGroupActions.loadVerbGroupSelectedInRoute),
            switchMap(() => {

                return this.store.select(verbGroupSelectors.getVerbGroupFromRouteSelector).pipe(
                    map((verbGroup) => {
                        //console.log('VerbGroupEffect',verbGroup);                 
                        if (verbGroup) {

                            // verbGroup.verbList.forEach((verb) => {

                            //     ///TODO not sure I want this here.
                            //     //My issue is this run every time.
                            //     if (verbGroup.presentTenseStemChangeType !== StemChangeType.none) {
                            //         verb.presentTense.stemChangeType = verbGroup.presentTenseStemChangeType;
                            //     }
                            // })

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