import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './verb.selectos';
import { Store } from '@ngrx/store';
import { verbActions } from './verb.actions';
import { VerbService } from './../verb.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class VerbEffect {

    constructor(private actions$: Actions,
        private verbService: VerbService,
        private conjugateService: ConjugateService,
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

    loadVerb$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbActions.loadVerb),
            switchMap(() => {
                return this.store.select(verbSelectors.getVerbFromRouteSelector).pipe(
                    map((verb) => {
                        if (verb) {
                            //TODO COULD YOU just do all this work in here
                            // and not have an action to load the tense                            
                            return verbActions.loadVerbTense({ verb });
                        }
                        const error = new Error('verb not found');
                        return verbActions.loadVerbError({ error });
                    })
                );
            })
        );
    });

    loadVerbTense$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbActions.loadVerbTense),
            switchMap((action) => {
                let verb = Object.assign({}, action.verb);
                this.conjugateService.setAllTense(verb);
                return of(verbActions.loadVerbSuccess({ verb }));
            })
        );
    });
}