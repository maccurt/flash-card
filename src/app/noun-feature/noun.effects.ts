import { map, mergeMap, catchError, of } from 'rxjs';
import { NounService } from './noun.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import nounActions from './noun-state/non-actions';

@Injectable()
export class NounEffect {
    constructor(private actions$: Actions, private nounService: NounService) { }

    loanNounList$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(nounActions.loadNounList),
            mergeMap(() => this.nounService.getNounList()
                .pipe(
                    map(nounList => nounActions.loadNounListSucess({ nounList }))
                )),
            catchError(error => of(nounActions.loadNounListError({ error })))
        )
    })
}