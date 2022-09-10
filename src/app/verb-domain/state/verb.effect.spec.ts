import { ConjugateService } from './../conjugate.service';
import { verbSelectors } from './verb.selectos';
import { VerbService } from './../verb.service';
import { verbActions, loadVerbSuccess } from './verb.actions';
import { VerbEffect } from './verb.effectss';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { verbStateInitial } from './verb.reducer';
import { VerbState } from "./VerbState.interface";
import { Verb } from '../types/verb.class.';

describe('verb effect', () => {
    let actions$: Observable<any>;
    let effects: VerbEffect;
    let store: MockStore<VerbState>;
    let verbServiceMock = new VerbService(null as any);

    let verbList: Verb[] = [{ to: 'to practice' } as any];
    let verb = verbList[0];

    let conjugationService: ConjugateService = new ConjugateService();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VerbEffect,
                provideMockActions(() => actions$),
                provideMockStore({
                    initialState: {
                        ['verb']: { ...verbStateInitial }
                    }
                }),
                { provide: VerbService, useValue: verbServiceMock },
                { provide: ConjugateService, useValue: conjugationService }
            ],
        });
        effects = TestBed.inject(VerbEffect);
        store = TestBed.inject(MockStore);
    });

    describe('loadVerb', () => {

        it('should call loadVerbTense with verb to get tense', (done) => {
            //We set up the action we want to dispatch
            actions$ = (of(verbActions.loadVerb));
            store.overrideSelector(verbSelectors.getVerbFromRouteSelector, verb);

            spyOn(verbActions, 'loadVerbTense');
            effects.loadVerb$.subscribe(() => {
                expect(verbActions.loadVerbTense).toHaveBeenCalledWith({ verb });
                done();
            });
        });

        it('verbAction.loadVerbError should be called with error', (done) => {
            //We set up the action we want to dispatch
            actions$ = (of(verbActions.loadVerb));
            store.overrideSelector(verbSelectors.getVerbFromRouteSelector, undefined);

            spyOn(verbActions, 'loadVerbError');
            effects.loadVerb$.subscribe(() => {
                expect(verbActions.loadVerbError).toHaveBeenCalledWith({ error: new Error('verb not found') });
                done();
            });
        });
    });

    describe('loadVerbTense$', () => {

        it('should call loadVerbSucess should set tense also', (done) => {
            //We set up the action we want to dispatch
            actions$ = (of(verbActions.loadVerbTense({ verb })));

            spyOn(conjugationService, "setAllTense");

            spyOn(verbActions, 'loadVerbSuccess');
            effects.loadVerbTense$.subscribe(() => {
                expect(verbActions.loadVerbSuccess).toHaveBeenCalledWith({ verb });
                expect(conjugationService.setAllTense).toHaveBeenCalledWith(verb);
                done();
            });
        });

    });

    describe('loadVerbListSucess$', () => {
        it('should call loadVerbListSucess with verblist to set state', (done) => {

            spyOn(verbServiceMock, 'getVerbList').and.returnValue(of(verbList));

            //We set up the action we want to dispatch
            actions$ = (of(verbActions.loadVerbList));
            spyOn(verbActions, 'loadVerbListSucess');

            effects.loadVerbList$.subscribe(() => {
                expect(verbActions.loadVerbListSucess).toHaveBeenCalledWith({ verbList });
                done();
            });
        });

        it('should call loadVerbListError with error', (done) => {

            let error = new Error('error getting verblist');
            spyOn(verbServiceMock, 'getVerbList').and.throwError(error);

            //We set up the action we want to dispatch
            actions$ = (of(verbActions.loadVerbList));
            spyOn(verbActions, 'loadVerbListError');

            effects.loadVerbList$.subscribe(() => {
                expect(verbActions.loadVerbListError).toHaveBeenCalledWith({ error });
                done();
            });
        });

    });

});