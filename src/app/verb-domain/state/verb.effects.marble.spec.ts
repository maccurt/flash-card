import { VerbService } from './../verb.service';
import { verbActions } from './verb.actions';
import { verbStateInitial } from './verb.reducer';
import { VerbEffect } from './verb.effectss';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { SpectatorHttp, SpyObject, createHttpFactory } from '@ngneat/spectator';
import { getTestScheduler, hot } from 'jasmine-marbles';
import { Action } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Verb } from './verb.class.';

describe('verb.effects.marble.specs.ts', () => {
    let testScheduler: TestScheduler, verbEffect: SpyObject<VerbEffect>;
    let actions$ = new Observable<Action>();
    let spectator: SpectatorHttp<VerbEffect>;
    let store: MockStore;
    let verbServiceMock: VerbService = new VerbService(null as any);

    const createEffects = createHttpFactory({
        service: VerbEffect,        
        mocks: [
            //TODO what can go in the mocks
        ],
        providers: [
            VerbEffect,
            { provide: VerbService, useValue: verbServiceMock },
            provideMockActions(() => actions$),
            provideMockStore({
                initialState: {
                    ['verb']: { ...verbStateInitial }
                }
            })
        ]
    });

    beforeEach(() => {
        testScheduler = getTestScheduler();
        spectator = createEffects();
        verbEffect = spectator.inject(VerbEffect);
        store = spectator.inject(MockStore);
    });

    describe('loadVerbList', () => {
        it('should emit email verification success response.', () => {

            let verbList: Verb[] = [{ to: 'to practice' } as any];
            spyOn(verbServiceMock, 'getVerbList').and.returnValue(of(verbList));

            actions$ = hot('-a--|', {
                a: {
                    type: verbActions.loadVerbList.type
                }
            });

            const expected = hot('-a--|', {
                a: {
                    type: verbActions.loadVerbListSucess.type,
                    verbList: verbList
                }
            });

            expect(verbEffect.loadVerbList$).toBeObservable(
                expected
            );
        });
    });
});
//https://medium.com/@bencabanes/marble-testing-observable-introduction-1f5ad39231c