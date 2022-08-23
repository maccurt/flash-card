import { verbActions } from './verb.actions';
import { VerbService } from './../verb.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of,tap } from 'rxjs';

@Injectable()
export class VerbEffect {

    constructor(private actions$: Actions, private verbService: VerbService) { }

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
}