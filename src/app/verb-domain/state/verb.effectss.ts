import { verbGroupActions } from './verb-group.actions';
import { VerbGroup } from "../types/VerbGroup";
import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './verb.selectos';
import { Store } from '@ngrx/store';
import { verbActions } from './verb.actions';
import { VerbService } from './../verb.service';
import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

@Injectable()
export class VerbEffect {

    constructor(private actions$: Actions,
        private verbService: VerbService,
        private conjugateService: ConjugateService,
        private store: Store) { }

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


    verbGroupSelectedInRoute$ = createEffect(() => {

        return this.actions$.pipe(
            ofType(verbGroupActions.loadVerbGroup)

        )
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