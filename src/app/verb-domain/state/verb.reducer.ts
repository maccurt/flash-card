import { verbActions } from './verb.actions';
import { createReducer, on } from "@ngrx/store";
import { Verb } from './Verb';

export interface VerbState {
    verbList: Verb[];
    verb?: Verb
    error: string;
}

export const verbStateInitial: VerbState = {
    verbList: [],
    error: ''
};

export const verbReducer = createReducer<VerbState>(verbStateInitial,

    on(verbActions.loadVerbList, (state): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),

    on(verbActions.loadVerbListSucess, (state, action): VerbState => {
        return {
            ...state,
            error: '',
            verbList: action.verbList
        };
    }),

    on(verbActions.loadVerbListError, (state, action): VerbState => {
        return {
            ...state,
            error: action.error.message,
            verbList: []
        };
    }),
    on(verbActions.loadVerb, (state, action): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),
    on(verbActions.loadVerbSuccess, (state, action): VerbState => {
        return {
            ...state,
            verb:action.verb,
            error: ''
        };
    }),

);