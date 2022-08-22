import { nounActions, loadNounList, loadNounListError } from './non-actions';
import { FromTo } from './../../verb-domain/state/Verb';
import { createReducer, on } from "@ngrx/store";

export class Noun implements FromTo {
    to!: string;
    to!: string;
}

export interface NounState {
    nounList: Noun[];
    error?: string
}

export const nounInitialState: NounState = {
    nounList: []
};

export const nounReducer = createReducer<NounState>(nounInitialState,

    on(nounActions.loadNounList, (state): NounState => {
        return {
            ...state,
            error: '',
        };
    }),

    on(nounActions.loadNounListSucess, (state, action): NounState => {
        return {
            ...state,
            error: '',
            nounList: action.nounList
        };
    }),

    on(nounActions.loadNounListError, (state, action): NounState => {
        return {
            ...state,
            error: action.error.message,
            nounList: []
        };
    })
);