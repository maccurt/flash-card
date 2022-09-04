import { VerbGroup } from "../types/VerbGroup";
import { verbActions, loadVerbGroupList, loadVerbGroupListSuccess, loadVerbGroupListError } from './verb.actions';
import { createReducer, on } from "@ngrx/store";
import { Verb } from "../types/verb.class.";

export interface VerbState {
    verbList: Verb[];
    verb?: Verb
    error: string;
    verbGroupList?: VerbGroup[];
    verbGroup?: VerbGroup
};

export const verbStateInitial: VerbState = {
    verbList: [],
    error: ''
};

export const verbReducer = createReducer<VerbState>(verbStateInitial,

    on(verbActions.loadVerbGroupList, (state): VerbState => {
        return {
            ...state,
            error: ''
        };
    }),

    on(verbActions.loadVerbGroupListSuccess, (state, action): VerbState => {
        return {
            ...state,
            error: '',
            verbGroupList: action.verbGroupList
        };
    }),

    on(verbActions.loadVerbGroupListError, (state, action): VerbState => {
        return {
            ...state,
            error: action.error.message,
            verbGroupList: []
        };
    }),

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
            verb: action.verb,
            error: ''
        };
    }),
    on(verbActions.setVerbGroupSelectedSuccess, (state, action): VerbState => {        
        return {
            ...state,
            verbGroup: action.verbGroup,
            error: ''
        };
    }),

);