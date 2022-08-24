import { verbSelectors } from './verb.selectos';
import { Store } from '@ngrx/store';
import { verbActions } from './verb.actions';
import { VerbService } from './../verb.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class VerbEffect {

    constructor(private actions$: Actions,
        private verbService: VerbService,
        private store: Store) { }

    loadVerbList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbActions.loadVerbList),
            mergeMap(() => this.verbService.getVerbList()
                .pipe(
                    map(verbList => verbActions.loadVerbListSucess({ verbList }))
                )),
            catchError(error => of(verbActions.loadVerbListError({ error })))
        );
    });

    // loadVerb$ = createEffect(() => {

    //     return this.actions$.pipe(
    //         ofType(verbActions.loadVerb),
    //         mergeMap(() => this.store.select(verbSelectors.getVerbListSelector).pipe(

    //         ))


    //     )

    // })
}